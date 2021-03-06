#리뷰 테이블 생성
create table reviews(
	WRITE_NO int(10) auto_increment,
	TITLE varchar(45) not null,
	STARS int(1) not null,
	CONTENTS text not null,
	IMAGE varchar(100) default 'N',
    RESER_NO int(10) not null,
	RESER_DT datetime not null,
	LIKE_NUM int(4) not null default '0',
	HATE_NUM int(4) not null default '0',
	WRTIE_DT datetime not null,
	primary key(WRITE_NO)
);

#좋아요 및 싫어요 정보 저장 테이블
create table review_reaction(
	COLUMN_NO int(10) not null auto_increment,
	WRITE_NO int(10) not null,
	IP_ADDR varchar(15) not null,
	REACTION_ST varchar(5) not null,
	primary key(COLUMN_NO),
	foreign key(WRITE_NO)
	references reviews(WRITE_NO) on update cascade on delete cascade
);

#예약 정보가 저장된 테이블
create table reservation (
	RESERWRI_NO int(10) auto_increment,
	RESER_NO int(20) not null,
	USER_NM varchar(20) not null,
	PHONE_NO varchar(11) not null,
	RESER_DT datetime not null,
	RESER_ST int(1) not null,
	CANCEL_DT datetime,
	REVIEW_ST char(1) not null,
    primary key(RESERWRI_NO)
);

#리뷰 글 관련 데이터 삽입
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('맛있어요',5,'식당이 깔끔하고 좋네요','2017-11-29 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('추천해요',5,'정말 맛있어요 꼭 오세요','2018-08-09 16:30:00');

#예약 정보 관련 데이터 삽입
insert into reservation(RESER_NO, USER_NM, PHONE_NO, RESER_DT, RESER_ST, REVIEW_ST) values(1809165, '강다니엘', '01012345678', '2017-10-14 11:00:00', 1, 'N');
insert into reservation(RESER_NO, USER_NM, PHONE_NO, RESER_DT, RESER_ST, CANCEL_DT, REVIEW_ST) values(1810235, '강다니엘', '01012345678', '2017-09-07 14:30:00', 2, '2017-09-09 17:04:25', 'N');
insert into reservation(RESER_NO, USER_NM, PHONE_NO, RESER_DT, RESER_ST, REVIEW_ST) values(1805155, '김태희', '01012341234', '2018-05-14 19:00:00', 1, 'N');
insert into reservation(RESER_NO, USER_NM, PHONE_NO, RESER_DT, RESER_ST, REVIEW_ST) values(1807155, '김태희', '01012341234', '2018-07-20 19:00:00', 1, 'N');
insert into reservation(RESER_NO, USER_NM, PHONE_NO, RESER_DT, RESER_ST, REVIEW_ST) values(1811235, '김태희', '01012341234', '2018-11-04 17:00:00', 1, 'N');