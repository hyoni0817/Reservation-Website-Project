## 프로그램 실행 전 주의사항
1. 데이터 삽입은 '글쓰기' 페이지를 통해 진행해주세요**
2. 비밀글과 수정, 삭제시 요구하는 비밀번호는 0000 입니다.

## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 qnaSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 03.etc 경로에서 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤, 아래 URL 설명을 참고하여 접속해주세요.   

## URL 설명
1. 글 목록보기 : <http://localhost:3000/qna>
2. 글 보기: <http://localhost:3000/qnaView?page=1&wriNo=8&auth=queWri>
    - page : 글이 위치했던 페이지 번호
    - wriNo : 글의 번호
    - part : queWri(질문글 보기), editAndDelete(수정 및 삭제 페이지 보기)의 값을 구분지어 받아들여서 값에 따라 다른 페이지를 나타냅니다.
 3. 카테고리 및 검색에 관련된 조건들
  : <http://localhost:3000/qna?inquiry=0&searchContent=0&answer=0&condition=0>
    - inquiry : 문의 카테고리 구분으로 0(전체), 1(예약 문의), 2(운영 문의), 3(기타 문의), 4(건의)입니다.
    - searchContent : 검색한 내용
    - answer : 답변 여부를 나타내는 것으로 0(질문 전체), 1(답변 완료)입니다.
    - condition : 검색할 때 사용하는 조건으로, 1(제목+내용), 2(제목), 3(내용), 4(작성자)를 의미합니다.
  4. 글의 수정 및 삭제
   : <http://localhost:3000/secretCheck?page=1&wriNo=6&stat=edit&part=editAndDelete>
     - stat: 수정과 삭제를 구분해서 나타내는 것으로, edit(수정), delete(삭제)입니다.
  5. 비밀글 : <http://localhost:3000/secretCheck?page=1&wriNo=7&part=queWri>
     - secretCheck을 제외하고 ? 뒷 부분은 2번의 글 보기에서 전달하는 매개 변수와 같은 의미입니다.
  
  
## 03.ect 에서 구현한 것
1. 검색 기능
  - '예약'이라는 단어로 검색했을 때
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/search.png"></p>

  - 답변한 것만 검색 가능(아래 예시 외에 내용 검색에서도 답변한 것만 결과가 나오게끔 할 수 있음)
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/searchanswer1.png"></p>
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/searchanswer2.png"></p>

  - 제목+내용/제목만/내용만/작성자 중 선택해서 검색 가능
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/multi.png"></p>

2. 페이지네이션 기능
  - 한 페이지당 글이 10개씩 보이며 글을 추가할 때마다 페이지가 추가
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/pagination.png"></p>
  
3. 카테고리 선택 기능
  - 전체/예약 문의/운영문의/기타 문의/건의사항 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/category.png"></p>
  
4. 글 보기 /글쓰기 / 수정 / 삭제 구현
  - 수정 및 삭제 시 비밀번호 입력받아야 다음 작업 수행 가능
    <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/edit2.png" width="400" height="auto"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/delete2.png" width="400" height="auto"></p>
    
  - 수정을 할 떄 비밀번호를 입력하지 않고 폼을 제출하면 기존 비밀번호를 유지
    <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/edit3.png"></p>
    
  - 글 쓰는 도중에 페이지를 벗어나려고 할 때 경고문을 띄우기
    <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/out.png"></p>
  
5. 모바일 / PC ver. 화면 구현
  - *QnA 폴더 내 01번 폴더 readme.md 참고해주세요*
  
6. 비밀글 구현
  - 비밀글 구현시 비밀번호를 입력할 때 4자리 미만은 **4~8자리를 충족하지 못합니다**라는 경고 나타내기
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/password3.png"></p> 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/password4.png"></p>
  
  - '비밀글로 설정하기'를 체크하면 아래의 사진에서와 같이 잠금 아이콘이 글 제목 옆에 달리며 제목을 누르면 비밀번호 입력하는 페이지 나타내기. 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/secret3.png"></p> 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/secret1.png"></p>   
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/secret2.png"></p>  

7. 답변 달기
  - 답변은 postman을 통해 추가하거나 직접 DB에 삽입해서 이용해주세요.      
    **postman을 통해 데이터 삽입할려고 한다면 아래의 이미지를 참고해주세요. 단 Hearders의 content-type 체크는 해제해주세요.**     
    **x-www-form-urlencoded** 를 선택해주시고 key는 **queWriNo**(int형으로 답변할 질문글의 글번호를 입력해주세요), **adminName**(varchar형으로 원하는 이름으로 넣어주시고 빈칸일 경우에는 관리자가 입력됩니다), **contents**(mediumtext형으로 답변할 내용을 입력해주세요)
    <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/postman.png"></p>   
    
  - 답변이 달렸을 때 답변 상태 변경 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/answer1.png"></p>
  
  - 답변이 달린 후에는 수정하기 및 삭제 버튼 지우기
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/answer2.png"></p>   
  
8. 조회수 구현
> 단, 비밀글은 비밀번호를 입력하고 글을 봐야 조회수가 증가합니다.
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/qna03/views1.png"></p>   
