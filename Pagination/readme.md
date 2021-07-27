## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 reviewSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤에 아래 URL을 통해서 글 목록과 함께 페이지네이션을 확인 할 수 있습니다. 한 페이지당 10개의 글이 보입니다.    
10개 단위로 데이터를 추가하면 페이지가 증가합니다.   
**🖥URL**   
글 보기: <http://localhost:3000/>   
페이지네이션: <http://localhost:3000/?page=1>   

   - page: 페이지 번호

## Pagination에서 구현된 것
 <p align="center"><img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/pagination/all.png"></p>
 
 1. 페이지네이션과 함께 제공된 버튼의 역할
  - &gt;는 5개 단위로 다음 페이지 번호를 보여주는 역할을 합니다. 아래의 이미지는 페이지가 8페이지까지 있어서 8까지 나타냅니다.
   <p align="center"><img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/pagination/next.png" ></p>
   
  - &raquo; 는 제일 마지막 페이지 번호를 보여줍니다.
   <p align="center"><img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/pagination/end.png"></p>
   
  - &lt; 는 5개 단위로 이전 페이지 번호를 보여주는 역할을 합니다. 아래의 이미지는 6페이지에서 버튼을 눌렀기때문에 이전 페이지 번호인 5페이지를 보여줍니다.
   <p align="center"><img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/pagination/prev.png"></p>
   
  - &laquo; 는 제일 첫번째 페이지 번호를 보여줍니다.
   <p align="center"><img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/pagination/first.png"></p>
