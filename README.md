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
