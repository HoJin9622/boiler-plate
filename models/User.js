const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema); // Schema를 model로 감싸줌.

module.exports = { User };
