## 프로그램 실행 전 주의사항
1. DB가 연동되어 있으므로 01.Log in and user check 폴더 내의 reserSQL을 통해 테이블 생성 및 데이터 삽입 후 app.js 파일을 실행시켜주세요.
2. 바로 테스트 해보실려면 예약번호는 **952589**, 이름은 **김지선** 을 입력해주세요.

## URL 설명
1. 예약 정보 입력하기 : http://localhost:3000/
2. 예약 정보 내용 보기 : http://localhost:3000/reserList

## 01.Log in and user check에서 구현한 것
1. 예약 번호와 이름을 입력받아서 로그인합니다.
<p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/input.png"></p>

2. 입력한 정보가 잘못되었을 경우, 알림 메세지를 띄웁니다.
  - 예약 번호를 입력 안 했을 때
  <p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/number.png"></p>
  
  - 이름 입력 안 했을 때
  <p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/name.png"></p>
  
  - 예약 번호나 이름을 잘못 입력 했을 때
  <p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/noperson.png"></p>

3. 예약 확인은 아래의 사진과 같이 할 수 있습니다.
 <p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/check.png"></p>

4. 세션 만료 시간을 10분으로 지정해놔서 10분을 초과하면 아래와 같은 메세지가 뜹니다.
<p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/over.png"></p>

5. 로그인을 하지 못하면 예약 내역을 확인하지 못합니다.
<p align="center"><img src="https://devdata201907.s3.ap-northeast-2.amazonaws.com/markdown/reser01/accessno.png"></p>
