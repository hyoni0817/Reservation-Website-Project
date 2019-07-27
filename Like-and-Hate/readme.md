> DB가 연동되어 있으므로 Like-and-Hate 폴더 내의 reviewSQL을 통해 테이블 생성 및 데이터 삽입 후 app.js 파일을 실행시켜주세요.

## Like-and-Hate 에서 구현한 것

1. app.js를 실행하고 난 뒤에 아래의 URL을 통해서 작성된 글 내부에 포함된 좋아요/싫어요를 볼 수 있습니다,
  - 페이지 접속하기 : http://localhost:3000/

2. 작성된 리뷰의 제목을 누르면 <img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/like.png" height="18ox" width="18px">(좋아요)와 <img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/hate.png" height="18ox" width="18px">(싫어요)를 누를 수 있는 버튼이 구현되어 있습니다.
<p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/all.png"></p>

3. ip주소를 검사해서 중복으로 좋아요/싫어요를 누르지 못하도록 합니다.
<p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/likeandHate/already.png"></p>
