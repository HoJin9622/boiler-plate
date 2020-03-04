const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
    next(); // 비밀 번호를 바꾸는게 아닐경우 next()로 다음꺼 실행
  }
}); // user model의 정보를 save하기 전에 function() 을 한다.

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword 1234567와 데이터베이스에 있는 암호화된 비밀번호가 같은지 체크
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  const user = this;
  // jsonwebtoken을 이용해서 token을 생성하기

  const token = jwt.sign(user._id.toHexString(), "secretToken"); // user._id + "secretToekn" = token
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema); // Schema를 model로 감싸줌.

module.exports = { User };
