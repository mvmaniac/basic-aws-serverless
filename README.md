# Basic Amazon Web Services Serverless

### 1. 아마존 클라우드 무료계정으로 시작하는 서버리스 애플리케이션 프로젝트 강의 실습 예제 기반

* [아마존 클라우드 무료계정으로 시작하는 서버리스 애플리케이션 프로젝트](https://www.inflearn.com/course/AWS-%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4-%EC%9B%B9%EC%95%B1# "아마존 클라우드 무료계정으로 시작하는 서버리스 애플리케이션 프로젝트") 참고

### 2. 차이점

* EditorConfig 설정 추가
* ESLint & Prettier 설정 추가
* webpack 설정 추가

### 3. TODO

*

### 4. Setting

#### 4-1. front-end

* webpack

    ``` javascript
    npm i -D webpack webpack-cli webpack-dev-server
    npm i -D webpack-merge
    ```

* webpack loader & plugin

    ``` javascript
    npm i -D babel-loader
    npm i -D css-loader style-loader
    npm i -D sass-loader node-sass
    npm i -D url-loader file-loader
    npm i -D clean-webpack-plugin mini-css-extract-plugin html-webpack-plugin
    npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
    npm i -D copy-webpack-plugin
    ```

* babel & core-js

    ``` javascript
    npm i -D @babel/core @babel/preset-env
    npm i -D babel-eslint
    npm i -D core-js
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb-base eslint-plugin-import eslint-import-resolver-alias
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

#### 4-2. lambda

* aws-sdk

    ``` javascript
    npm i aws-sdk
    ```

* aws-xray-sdk (xray를 Lambda Layer에 올려서 사용함, [계층 내 라이브러리 종속 항목들을 포함](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/configuration-layers.html) 부분 확인)

    ``` javascript
    npm i aws-xray-sdk
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb-base eslint-plugin-import
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```
