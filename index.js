const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json, json 타입으로 된 것을 분석해서 가져올 수 있게 해주기 위함
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://kiss0104040:pw@youtube-bldk7.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!~~"));

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); //body-parser가 있어서 req.body안에 id, pw 같은 정보를 넣음
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); // json 형식으로 client에 전달
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
