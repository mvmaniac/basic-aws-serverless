# Basic Amazon Web Services Serverless

### 1. 강의 실습 예제 기반

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

* aws-xray-sdk

    ``` javascript
    npm i aws-xray-sdk
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb-base eslint-plugin-import
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

### 5. etc

* front-end  
  aws cli 를 통해서 배포 할 수 있음  
  이미 만들어진 S3에 업데이트인 경우로 npm build 후 배포 할 것
  
  버킷 나열

  ```cmd
  aws s3 ls
  ```

  버킷 업데이트

  ```cmd
  aws s3 sync ./dist s3://[버킷이름]
  ```

* lambda  
  각 폴더 별로 package.json이 있는 이유는 nodejs 기반으로 SAM 으로 올릴 경우 반드시 필요함, 없으면 빌드가 실패됨

* aws-xray-sdk  
  xray를 Lambda Layer에 올려서 사용함, [계층 내 라이브러리 종속 항목들을 포함](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/configuration-layers.html) 부분 확인  
  직접 파일 업로드를 해서 올릴경우 nodejs 폴더 아래에 node_modules 폴더가 있어야 함 (다시 말하자면 npm install이 필요함)  

* aws-sam-cli
  build 명령어 실행 시 임의로 만들어지는 .tgz 파일이 temp 디렉터리 쪽으로 안풀림  
  아래 파일 경로를 직접 수정해서 실행 시킴 (환경적 요인이 있는듯...)

  ```console
  [설치경로]\runtime\Lib\site-packages\aws_lambda_builders\workflows\nodejs_npm\actions.py
  ```

  위 파일에서 NodejsNpmPackAction 클래스 execute 함수 부분을 수정함  
  .tgz 파일이 프로젝트 루트에 생성되어서 프로젝트 루트에 있는 .tgz 파일 경로를 바라보게 함

  ```python
  project_path = self.osutils.dirname((self.osutils.dirname(self.osutils.dirname(self.manifest_path)))) # 이 부분 추가

  ...(생략)

  tarfile_path = self.osutils.joinpath(project_path, tarfile_name) # project_path를 바라보게 수정

  ...(생략)

  self.osutils.extract_tarfile(tarfile_path, self.artifacts_dir)
  ```
