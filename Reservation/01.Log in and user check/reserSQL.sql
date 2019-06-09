#예약 테이블 생성
create table reservation (
 RESERWRI_NO int(10) auto_increment,
 RESER_NO int(20),
 USER_NM varchar(20),
 PHONE_NO varchar(20),
 EMAIL varchar(50),
 RESER_DT datetime,
 SEATS_NO int(2),
 PEOPLE_NUM int(2),
 primary key(RESERWRI_NO)
);

#예약 정보 데이터 삽입
insert into reservation(RESER_NO,USER_NM,PHONE_NO,EMAIL,RESER_DT,SEATS_NO,PEOPLE_NUM) values(958989,'김지선','01012345678','happy1234@naver.com','2019-06-30 15:30:00',2,4);

#데이터 확인하기
SELECT * FROM reservation;