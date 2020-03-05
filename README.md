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

## body-parser와 postman

    npm install body-parser --save

body-parser : body-parser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게

postman 설치 : https://www.postman.com/downloads/

postman을 이용해 http://localhost:5000/register 로 body(raw) - json 정보를 보낸다.

    {
        "name": "test",
        "email": "test2@gmail.com",
        "password": "1234567"
    }

위는 보낸 예시

## nodemon

소스 코드의 변경이 있으면 서버를 내렸다가 다시 켜야하는데 껏다 키지않아도 바로 반영해준다.

    npm install nodemon --save-dev

-dev : develope mode, local에서 할때만 사용하겠다는 뜻, devDependencies에 들어가게 된다.

script에 "backend": "nodemon index.js" 추가

## git

github에 mongodb 비밀번호를 올리면 안되므로 config 폴더에 dev.js, prod.js로 비밀번호를 파일로 나눠준다.

gitignore에 dev.js 파일을 등록한다.

prod.js 는 deploy 할 때 필요, ex) heroku

key.js 는 개발환경인지 배포환경인지 보고 if문으로 선택

## Bcrypt

    npm install bcrypt --save

https://www.npmjs.com/package/bcrypt

salt를 이용해서 비밀번호를 암호화, salt를 먼저 생성

saltRounds는 salt가 몇글자인지 나타냄.
