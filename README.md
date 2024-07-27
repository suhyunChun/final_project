 ##### 2인 프로젝트 

##### -FrontEnd

##### 팀구성 - BE 1명, FE 1명

##### 상세역할 -

##### 메인 페이지 (유저들이 응답을 기록하는 페이지):

- moment라이브러리를 이용해서 날짜 표현. add, substract으로 양옆 화살표로 날짜 수정 가능 
오늘 날짜를 기준으로 더이상 미래의 날짜는 이용할 수 없도록 화살표를 disabled로 설정. 응답을 저장한 후에는 날짜를 바꿨다가 다시 돌아와도 응답 그대로 유지  

##### 루틴에 필요한 질문 편집: 

- 총 4개 타입의 다른 질문을 유저가 자유롭게 추가, 삭제할 수 있도록 설정. 원하는 질문들을 저장한 후에는 날짜별로 똑같은 질문들이 뜰 수 있도록 구현.

##### 유저의 루틴 데이터 그래프화: 

- Recharts 라이브러리를 이용해서 유저가 저장한 루틴 데이터를 그래프화. 
각 질문의 타입에 따라 막대그래프, 라인그래프 등, 질문 타입에 맞는 그래프가 뜰 수 있도록 설정. 



# Day Logger App - Frontend 

##Unit Testing in frontend

`./sample/test/CheckInclude -> checking certain value included or not`

`./sample//test/GroupByKey -> find value of certain key in object array `

run `yarn test` on terminal.

## Setting 

run `npm install`before run project

## When create new account (signup)

User can make their own account by clicking create new account.
If there is no issue in their email && password format, they are successfully make their account and back to login page.


## Login 

If password does not match, it shows 'login error' message which means user type invalid email/password

## Deployment (Netlify)
`https://festive-jones-db734b.netlify.app/`

## Deployment (Heroku)
`https://cse316-final-project.herokuapp.com`
 

## Sample User
#### email: `test@gmail.com`
#### password: `Password1`
