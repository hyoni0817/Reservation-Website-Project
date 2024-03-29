<h1 align="center">🍝식당 예약 웹사이트 기능 모음</h1>
<p align="center">
  식당 예약 웹사이트를 제작하면서 구현한 기능들을 정리한 것 입니다.
</p>
<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=Html5&logoColor=white"></img>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"></img>
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"></img>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"></img>
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon%20S3&logoColor=white"></img><br/>
  <img src="https://img.shields.io/badge/node.js-12.18.3-green?style=flat-square"></img>
  <img src="https://img.shields.io/badge/express-4.16.3-lightgray?style=flat-square"></img>
  <img src="https://img.shields.io/badge/ejs-2.6.1-blueviolet?style=flat-square"></img>
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square"></img> 
</div>
<div align="center">
  <img src="https://devwebdata2021.s3.ap-northeast-2.amazonaws.com/readme/reservation.gif"></img>
</div>

## 각 폴더에서 구현된 기능 소개
자세한 내용은 각 폴더의 README를 참고해주세요.

- [Like-and-Hate](https://github.com/hyoni0817/Reservation-Website-Project/tree/master/Like-and-Hate) : ip 체크해서 중복으로 좋아요 및 싫어요 누르지 못하게 하는 기능 
- [Pagination](https://github.com/hyoni0817/Reservation-Website-Project/tree/master/Pagination) : 한 페이지당 글이 10개씩 보이는 페이지네이션
- [QnA](https://github.com/hyoni0817/Reservation-Website-Project/tree/master/QnA) : 글쓰기, 수정, 삭제, 비밀글 작성, 검색 등의 기능이 포함된 QnA
- [Reservation](https://github.com/hyoni0817/Reservation-Website-Project/tree/master/Reservation) : 예약 하기와 예약 내역 확인 기능
- [Review](https://github.com/hyoni0817/Reservation-Website-Project/tree/master/Review) : 리뷰 보기와 예약자만 리뷰 작성 가능한 기능 (리뷰 작성시 AWS S3를 사용하여 이미지 업로드 가능)

## Demo
구현된 모든 기능들을 아래의 링크를 통해 미리 경험해 볼 수 있습니다.   
🏠 [식당 예약 웹 사이트로 이동하기](http://13.125.220.200:3000/)

## 설치 방법
1. 이 repository를 clone 해준 뒤, Reservation-Website-Project 폴더로 이동해서 npm 모듈을 설치해줍니다. 
    ```
    git clone https://github.com/hyoni0817/Reservation-Website-Project.git
    cd Reservation-Website-Project && npm install
    ```
2. 각 폴더마다 따로 실행되게 되어있습니다.   
   실행해보고 싶은 폴더의 README를 참고하여 사용해주세요.
