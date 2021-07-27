## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 qnaSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 02.prevBtn and NextBtn,listBtn 경로에서 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤, 아래의 URL을 통해서 글 목록과 작성글을 볼 수 있습니다.   
**🖥URL**   
글 보기: <http://localhost:3000/qna>   
페이지네이션: <http://localhost:3000/qnaView?page=1&wriNo=6>   

    - page: 글이 위치했던 페이지 번호   
    - wriNo: 글의 번호   

## 02.prevBtn and NextBtn,listBtn 에서 구현한 것
1. 작성글 내에서 목록 버튼을 누르면 현재 보고있는 글이 위치한 목록의 페이지을 볼 수 있습니다.
<div align="center">
    <img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/qna02/list2.jpg" height="auto" width="800">
</div>
2. 작성글 내에서 이전글, 다음글 보기를 할 수 있습니다. 
<div align="center">
    <img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewAll4.png" height="auto" width="800">
</div>

3. 가장 마지막글과 가장 처음글은 이전글 보기와 다음글 보기 각각 하나씩만 나타납니다.
<div align="center">
    <img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewPrev4.png" height="auto" width="800">
    <img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewNext4.png" height="auto" width="800">
</div>
