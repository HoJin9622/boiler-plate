# Boiler-Plate

## Node.js

자바스크립트를 브라우저에서만이 아닌 서버사이드에서 쓸 수 있게 해줌.

## Express.js

Node.js web application framework

Node.js를 좀 더 쉽게 이용할 수 있다.

## npm init

package.json을 만들어줌.

## index.js

back-end 시작점.

## npm i express --save

--save : package.json dependencies에 express가 추가됨.

## 코드 설명

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

   "scripts": {
   "start": "node index.js",
   "test": "echo \"Error: no test specified\" && exit 1"
   }

6. npm run start 치면 node index.js 를 실행해준다.

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
