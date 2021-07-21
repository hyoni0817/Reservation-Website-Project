## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 reviewSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤, 아래의 URL로 접속하면 작성된 글 내부에 포함된 좋아요/싫어요를 볼 수 있습니다.   
**🖥URL** : <http://localhost:3000/>

## Like-and-Hate 에서 구현한 것
1. 작성된 리뷰의 제목을 누르면 <img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/like.png" height="18ox" width="18px">(좋아요)와 <img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/hate.png" height="18ox" width="18px">(싫어요)를 누를 수 있는 버튼이 구현되어 있습니다.
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/all.png"></p>

2. ip주소를 검사해서 중복으로 좋아요/싫어요를 누르지 못하도록 합니다.
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/already.png"></p>
