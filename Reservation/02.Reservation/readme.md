## 프로그램 실행 전 주의사항
1. 데이터 삽입은 예약하는 과정을 통해 진행해주세요.

## 사용법
1. model/dbConnetion.js 에서 자신의 DB 환경에 맞게 각 속성값을 수정해주세요.
2. MySQL로 reserSQL.sql 파일을 실행시켜서 테이블 생성 및 데이터 삽입을 해주세요. 데이터는 직접 더 많이 추가할 수 있습니다.
3. 마지막으로 02.Reservationk 경로에서 app.js를 실행시켜줍니다.
   ```
   node app.js
   ```
4. app.js를 실행하고 난 뒤, 아래 URL 설명을 참고해서 step1 부터 차례대로 진행해주세요.   

## URL 설명
예약하는 단계가 총 3가지로 이루어져 있습니다.    

**STEP1** - 예약자 정보 입력하기 : http://localhost:3000/reser/step1       
**STEP2** - 예약 날짜, 시간, 인원수, 좌석 선택하기 : http://localhost:3000/reser/step2     
**STEP3** - 입력한 내역 확인하기 : http://localhost:3000/reser/step3       

## 02.Reservation 에서 구현한 것

### step1
1. 예약자 정보 입력하기
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step1/reserinfo.png"></p>

2. 만약 제대로 입력하지 않은 칸이 있을 경우, 알림 메세지 발생
  - 이름, 전화번호, 이메일, 약관 동의 안할 시 아래의 메세지 발생(단, 요청 사항은 비워도 상관없음)
  
    *예) 이름을 입력하지 않았을 때*
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step1/name.png"></p>
  
  - 정규식 검사를 통해 전화번호 입력란에 숫자 외에 다른 문자가 들어갈 경우 알림 메세지 발생
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step1/phone.png"></p>
  
  - 정규식 검사를 통해 이메일 입력란에 제대로 되지않은 이메일 형식이 들어갈 경우 알림 메세지 발생
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step1/email.png"></p>

### step2
1. 날짜, 시간, 인원수, 좌석 선택하기
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/step2.png"></p>

  - 인원을 선택해야 좌석 선택 가능
  <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/fistpeo1.png"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/fistpeo2.png"></p>

  - 인원수에 따라 선택할 수 있는 좌석이 다름.
    - 1~2명: 7,16 제외
    - 3명: 7,16,10~13 제외
    - 4명: 8~15 제외
    - 5~6명: 7,16만 가능
    <p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/peoplesel1.png"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/peoplesel2.png"></p>

2. 만약 날짜, 시간, 인원수, 좌석 중 하나라도 선택하지 않을 경우, 알림 메세지 발생
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/error.png"></p>

3. 이미 본인이 같은 날짜에 예약한 내역이 있다면 그 날은 예약 불가
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/already.png"></p>

4. 동일 날짜, 시간, 좌석에 예약한 내역이 있다면 예약 불가
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/overlap.png"></p>

5. 당일 예약은 불가하고 다음날 부터 한 달의 기간 내에서만 예약 가능

    *예) 아래 이미지는 6월 27일 기준*
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/cal1.png" width="400px" height="auto"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/cal2.png" width="400px" height="auto"></p>
6. step2에서 10분 이내 입력을 마무리하지 못할 시 세션 만료가 되어 다시 처음 페이지로 이동
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/sessionover.png"></p>

### step3
1. 앞에서 입력한 예약 정보 확인 가능
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step3/step3.png"></p>

### 그 외
1. 예약자 정보를 입력하지 않으면 step2, step3 페이지 이동 불가능
<p align="center"><img src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/markdown/reser02/step2/firstinput.png"></p>

