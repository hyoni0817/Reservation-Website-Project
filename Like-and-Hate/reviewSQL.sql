#리뷰 테이블 생성
create table reviews(
WRITE_NO int(10) auto_increment,
TITLE varchar(45) not null,
STARS int(1) not null,
CONTENTS text not null,
RESER_DT datetime not null,
LIKE_NUM int(4) not null default '0',
HATE_NUM int(4) not null default '0',
primary key(WRITE_NO)
);

#좋아요 및 싫어요 정보 저장 테이블
create table review_reaction(
COLUMN_NO int(10) not null auto_increment,
WRITE_NO int(10) not null,
IP_ADDR varchar(15) not null,
REACTION_ST varchar(5) not null,
primary key(COLUMN_NO)
);

#리뷰 글 관련 데이터 삽입
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('맛있어요',5,'식당이 깔끔하고 좋네요','2017-11-29 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('추천해요',5,'정말 맛있어요 꼭 오세요','2018-08-09 16:30:00');
