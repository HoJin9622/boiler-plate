const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // 공백을 제거하는 역할
    unique: 1 // 유일하게 하나
  },
  password: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0 // 임의로 지정하지 않을 경우 0을 준다.
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function(next) {
  const user = this;

  // password가 변활될때만
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}); // user model의 정보를 save하기 전에 function() 을 한다.

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$.af5cvvJ/3TJClVYurgsjOsk8sz09pH6lVZLentGSudMMj30.DhIm
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema); // Schema를 model로 감싸줌.

module.exports = { User };
