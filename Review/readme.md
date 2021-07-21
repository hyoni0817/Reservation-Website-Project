## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 reviewSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤, 아래 URL 설명을 참고하여 접속해주세요.  

## URL 설명
1. 리뷰 보기 : http://localhost:3000/ or http://localhost:3000/?page=1
  - page : 페이지 번호
  
2. 리뷰 정렬 : http://localhost:3000/?arr=newest&page=1
  - arr : 리뷰를 정렬하는 것으로 newest(최근 방문순), like(호감순), score(별점순) 를 의미합니다.

3. 글쓰기 : http://localhost:3000/checkReserUser
  - 글쓰기 전에 이름 및 전화번호 입력을 먼저합니다.
  
## Review에서 구현한 것
1. 리뷰 보기 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/view.png"></p>
  
   - 이미지를 나타낼 수도 있습니다. 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/img.png"></p>
  
2. 페이지네이션 기능 
  - 한 페이지당 글이 10개씩 보이며 글을 추가할 때마다 페이지가 추가 됩니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/page.png"></p>
  
3. 리뷰 정렬 선택 기능
  - 최근 방문순 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/newest.png"></p>
  
  - 호감순
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/likearr.png"></p>
  
  - 별점순
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/stars.png"></p>
    

4. 좋아요 / 싫어요 선택 기능 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/like.png"></p>
  
  - 좋아요 / 싫어요를 중복으로 누를 수 없습니다. 
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/likeoverlap.png"></p>
  

5. 글쓰기
  - 글쓰기 전에 이름 및 전화번호를 입력받습니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/np.png"></p>
  
  - 입력받은 이름 및 전화번호를 바탕으로 리뷰 쓰기가 가능한 예약 내역들과 작성 폼을 보여주고, 이 때 예약 시간으로 부터 한시간이 지난 것만 작성할 수 있습니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/write.png"></p>
  
  - 이미 작성한 리뷰는 수정 및 재작성이 불가합니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/nowrite.png"></p>
  
  - 방문 날짜에 대한 리뷰를 다 작성했다면 더이상 리뷰를 작성할 수 없습니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/complete.png"></p>
  
  - 예약 취소 및 예약한 내역이 없으면 리뷰를 작성할 수 없습니다.
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reviews/noperson.png"></p>
  
