# Boiler-Plate

## npm init

package.json을 만들어줌.

## index.js

back-end 시작점.

## package.json

    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    }

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

## Concurrently

front server와 back server를 한꺼번에 킬 수 있따

    npm install concurrently

    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""

scripts에 위 내용 추가

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

## Bcrypt

    npm install bcrypt --save

salt를 이용해서 비밀번호를 암호화, salt를 먼저 생성

saltRounds는 salt가 몇글자인지 나타냄.

## jsonwebtoken

    npm install jsonwebtoken --save

https://www.npmjs.com/package/jsonwebtoken

토큰 생성

## cookie-parser

    npm install cookie-parser --save
    app.user(cookieParser());

쿠키 저장에 필요

## react

    npx create-react-app .

src 폴더는 웹팩이 관리해주고

public 부분은 웹팩이 관리해주지 않는다.

image파일 같은 것을 넣을땐 src 부분에 넣어서 웹팩의 기능이 작용할 수 있도록 해준다.

점을 붙이면 client 폴더안에 설치하겠다는 의미

## react router dom

리액트에서는 react router dom으로 페이지를 이동한다.

    npm install react-router-dom --save

    <Route path="/login">
        <LoginPage />
    </Route>

위 코드를

    <Route path="/login" component={LoginPage} />

아래처럼 한줄로 작성 가능

path 앞에 exact를 붙여줄 것(왠진 모름 암튼)

## npm vs npx

npm(node package manager) 은 registry(저장소) 역할, 라이브러리를 담고 있다.

배포를 할때 build를 하고 배포를 해야하는데 npm run build처럼 npm을 사용함.

npx 를 사용하면 npm registry 에서 create-react-app을 찾아서 다운로드 없이 실행 시켜준다.

저장 용량을 낭비하지 않을 수 있고 항상 최신 버전을 사용할 수 있다.

## axios and proxy

    npm install axios --save

client와 server간의 통신을 할때 사용한다.

client가 없을때는 postman을 사용하여 요청하였는데

client가 있으면 axios로 요청하면 된다.

하지만 client 3000번 port와 server의 5000번 port가 다르기 때문에 5000번 port로 지정해줘야한다.

    axios.get("http://localhost:5000/api/hello")

그러나 서로 다른 port는 아무 설정없이 request를 보낼 수 없다.

Cors 정책 때문에 보안을 위해서(Cross-Origin Resource Sharing)

Proxy를 사용하는 방법으로 해결 가능.

https://create-react-app.dev/docs/proxying-api-requests-in-development/

First, install http-proxy-middleware using npm or Yarn:

    $ npm install http-proxy-middleware --save
    $ # or
    $ yarn add http-proxy-middleware

Next, create src/setupProxy.js and place the following contents in it:

    const proxy = require('http-proxy-middleware');
    module.exports = function(app) {
        // ...
    };

You can now register proxies as you wish! Here's an example using the above http-proxy-middleware:

    const proxy = require('http-proxy-middleware');
    module.exports = function(app) {
        app.use(
            '/api',
            proxy({
                target: 'http://localhost:5000',
                changeOrigin: true,
            })
        );
    };

주위 : http-proxy-middleware는 react-scripts@0.2.3 이상 버전이야한다. 그러므로 실행이 안될경우 npm i react-scripts를 하자.

proxy server란?

1. 방화벽 기능

2. 웹 필터 기능

3. 캐쉬 데이터, 공유 데이터 제공 기능

proxy server 사용 이유!

1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어

2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공

3. 더 나은 보안 제공

4. 이용 제한된 사이트 접근 가능

## antd

https://ant.design/

https://ant.design/components/button/

단점 : 사이즈가 크다.

장점 : 스타일이 깔끔하다. 쓰기가 편하다.

    npm install antd --save

    import "antd/dist/antd.css";

index.js에 import

## Redux

state가 변하면 rerendering되는 성질을 가지고 있다.

props는 부모 props가 내려다 줌.

Redux는 State을 관리하는 것.

Redux Store에 바로 주고받기가 가능.

다운받아야할 dependency들

1. redux

2. react-redux

3. redux-promise

4. redux-thunk

3, 4번은 redux middleware

redux store안에 모든 state를 관리하게 된다.

state를 변경하고 싶으면 한가지 방법이 있는데 Dispatch를 이용해서 action으로 변경 가능하다.

action은 plain object (객체형식) 이어야한다.

redux store에서 promise, function 형식이 올 수도 있다.

redux-promise와 redux-thunk는 Dispatch한테 function을 받는 방법과 promise를 대처하는 방법을 알려주는 역할이다.

thunk와 promise 가 없으면 에러가 많이난다.

    import { Provider } from "react-redux";

    ReactDOM.render(
        <Provider store={}>
            <App />
        </Provider>,
        document.getElementById("root")
    );

index.js 파일에 Provider를 import 한 후 <App /> 을 <Provider> 사이에 끼워준다.

    import {applyMiddleware, createStore} from "redux";
    import promiseMiddleware from "redux-promise";
    import ReduxThunk from "redux-thunk";

    const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

    <Provider store={createStoreWithMiddleware()}>

3,4 번 미들웨어 연결 방법

그리고 \_reducers 폴더에 index.js 를 만들고

    import { combineReducers } from "redux";
        // import user from "./user_reducer";

    const rootReducer = combineReducers({
        // user,
    });

    export default rootReducer;

import한다

    import Reducer from "./_reducers";

    <Provider store={createStoreWithMiddleware(Reducer)}>

import 한 후 provider에 넣어줌

redux extension 을 사용하려면 Reducer 뒤에 밑에 코드를 넣어줌

    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
