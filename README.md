## 프로젝트 설명
베이스 템플릿 프로젝트입니다. 이 프로젝트를 포크하여, 베이스 템플릿의 변경사항을 가져가면서 각자 프로젝트를 유지할 수 있습니다.
> **WARNING**: baseCommon 폴더는 지우지말아주세요
- 필요사항
- - nodejs
- 샘플 기능
- - 로그인
- - 회원가입
- - crud
- - 유효성 검사 --TODO
- - 파일 업로드 --TODO
### 기술 스택
1. nextjs
2. typescript
3. classvalidator
4. prime-react
5. express
6. graphql apollo server, client
7. typegraphql

###새 프로젝트 시작하기
https://blocksmith.atlassian.net/wiki/spaces/smith/pages/281182221/base-template+-
> **WARNING**: branch를 bare/express_*로 해주세요.

### db 접속 정보 변경
.gitlab-ci.yml 에 db접속정보 변경
.env.*에 db접속정보 변경

###프로젝트 명 변경
base-template => 프로젝트명

###메뉴 변경
config/menu.ts

###레이아웃 설정가이드 - TODO

###테마 스타일 css 생성 가이드 - TODO
https://blocksmith.atlassian.net/wiki/spaces/smith/pages/241205249/UI

###UI Kit( primereact ) theme 적용 방법
1. public/themes에 원하는 theme.css의 폴더 명을 NEXT_PUBLIC_DEFAULT_THEME에 입력하세요.

###UI Kit( primereact ) Document
https://www.primefaces.org/primereact/setup/

###폼 사용방법 - TODO
https://github.com/typestack/class-validator 참고
1. types/formModels에 모델 파일 추가
2. class validator의 valid함수로 검증

###이미지 리소스 안내
public/assets 아래 만들어주세요
https://blocksmith.atlassian.net/wiki/spaces/smith/pages/525467656/base-template **필독**

###백엔드 연동 안내
백엔드 인증 연동시 쿠키 설정으로 인해 백엔드를 localhost로 띄우거나, hosts파일을 수정하여 개발해주세요.

###주의사항
> **WARNING**: 프로젝트에 있는 파일들은 가급적 삭제하지 말아주세요.
###폴더 설명
    .
    ├── .gitlab                 # gitlab 배포 설정
    ├── .next                   # next 빌드 캐시파일. next build시 생성됩니다.
    ├── .platform               # 빈스톡 사용시 업로드 용량 설정
    ├── .storybook              # 스토리북 설정
    ├── apis                    # backend api 타입 및 호출 함수 모음
    ├── assets                  # 소스에서 import로 사용하는 글로벌 assets
    │   ├── layout              # layout assets
    │   └── sample              # 샘플
    ├── components              # 리액트 컴포넌트 디렉토리
    │   ├── baseCommon          # 공통 컴포넌트. base 템플릿에서 사용할 컴포넌트 목록( 삭제 X, 수정 X)
    │   ├── bizCommon           # 사이트별 공통 비지니스 컴포넌트 자유롭게 수정
    │   ├── common              # 사이트별 공통 컴포넌트 자유롭게 수정
    │   ├── layout              # 레이아웃 컴포넌트
    │   ├── ├── Default         # 기본 레이아웃 컴포넌트
    │   └── └── index.ts        # 사용할 레이아웃 컴포넌트 경로
    │   └── sample              # 샘플 컴포넌트
    ├── libs                    # uitlity library
    │   ├── baseCommon          # base 템플릿에서 사용할 라이브러리 목록( 삭제 X, 수정 X)
    │   ├── hooks               # React Custom Hooks
    │   ├── providers           # React Providers
    │   └── utils               # 도구
    ├── node_modules            # npm package module
    ├── pages                   # next route page. 폴더 경로가 라우트가 됩니다.
    │   ├── api                 # next api 라우트. next 에서 백엔드 api 개발시 사용.
    │   └── sample              # 샘플 페이지
    ├── public                  # next static assets. url로 접근하는 assets 
    │   └──assets
    │       ├── baseCommon      # base 템플릿에서 사용할 에셋 목록( 삭제 X, 수정 X)
    │       ├── images          # 이미지 assets
    │       ├── sample          # sample 페이지 관련 static assets
    │       └── themes          # primereact theme( 삭제 X, 수정 X)
    ├── server                  # 서버 코드 
    ├── store                   # mobx store. 상태 관리 클래스들 
    │   ├── baseCommon          # base 템플릿에서 사용할 라이브러리 목록( 삭제 X, 수정 X)
    │   └── sample              # 샘플 
    ├── types                   # 타입 
    │   ├── baseCommon          # base 템플릿에서 사용할 타입( 삭제 X, 수정 X)
    │   ├── enum                # enum 타입
    │   ├── formModels          # form 모델. validation rule도 같이 정의
    │   └── sample              # 샘플 관련 타입
    └── uml                     # UML 다이어그램
- - - -

##프로젝트 실행방법
###프로젝트 설치
> pnpm install
####
####개발
.env 사용
>pnpm dev

### 빌드 및 실행 
####서버 기능 버전
>pnpm build && pnpm start
####서버 기능 없는 스태틱 버전
>pnpm build-static && pnpm start-static

###스토리북
>pnpm storybook
