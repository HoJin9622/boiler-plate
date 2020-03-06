const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // client 쿠키에서 token을 가져온다.
  let token = req.cookies.x - auth;

  // token을 복호화 한 후 user를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });

  // user가 있으면 인증 o

  // user가 없으면 인증 x
};

module.exports = { auth };
