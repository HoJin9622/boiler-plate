# Boiler-Plate

## npm init

package.json을 만들어줌.

## index.js

back-end 시작점.

## express

    npm i express --save

--save : package.json dependencies에 express가 추가됨.

    const express = require('express')
    const app = express()
    const port = 5000

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

1. express 모듈을 가져온다.

2. express() function을 이용해서 새로운 express app을 만들고

3. port 번호를 정해준다.

4. root directory에 오면 Hello World! 를 출력시켜준다.

5. 5000번 포트에 이 앱을 실행한다.

## package.json

    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    }

## MongoDB

npm run start 치면 node index.js 를 실행해준다.

    npm install mongoose --save

몽구스 설치, 몽구스를 이용해 어플리케이션과 몽고db를 연결한다.

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

1. mongoose 모듈을 가져옴.

2. mongoose.connect 로 연결, id,pw 입력함

3. 중괄호안은 이걸 넣어야 에러가 안난다함

4. console.log로 제대로 연결되었는지 확인

5. 에러가 있으면 에러출력

## MongoDB - Schema Model

Model이란 Schema를 감싸주는 역할

Schema는 하나하나의 정보들을 지정해주는 것(?)

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

model 의 예시
