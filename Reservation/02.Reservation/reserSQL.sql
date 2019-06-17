#예약 테이블 생성
create table reservation (
	RESERWRI_NO int(10) auto_increment,
  RESER_NO int(20),
  USER_NM varchar(50),
  PHONE_NO varchar(15),
  EMAIL varchar(50),
  REQ_TERM mediumtext,
  TERM_CK char(1),
	RESER_DT datetime,
	SEATS_NO int(2),
	PEOPLE_NUM int(2),
	RESER_ST char(1) default 'Y',
	RESERWRI_DT datetime,
	CANCEL_DT datetime default 0,
	EDTI_DT datetime default 0,
	REVIEW_ST char(1) default 'N',
	primary key(RESERWRI_NO)
);

#RESER_ST는 예약 상태를 의미하며 상태값의 의미는 ['Y'- 예약한 상태, 'N' - 예약을 취소한 상태] 이다.
#데이터 삽입은 프로그램 실행하면서 직접 예약자 정보를 등록하면 데이터 삽입이 되므로 따로 소스 코드를 작성하지 않음.
