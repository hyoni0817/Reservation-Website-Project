create table question (
	WRITE_NO int(4) not null auto_increment,
    TITLE varchar(45) not null,
    USER_NM VARCHAR(15) not null,
	CONTENTS MEDIUMTEXT not null,
	WRITE_DT DATETIME not null,
	VIEW_CNT INT(10) not null default '0',
	CATEGORY VARCHAR(25) not null,
	ANSWER_ST CHAR(1) not null default 'N',
	USER_PW VARCHAR(8) not null,
	SECRET_ST CHAR(1) not null default 'N',
    primary key(WRITE_NO)
);

create table answer (
	QUEWRI_NO INT(4) not null,
	ADMIN_NM VARCHAR(15) not null default '관리자',
	CONTENTS MEDIUMTEXT not null,
	ANSWRI_DT DATETIME not null,
    primary key(QUEWRI_NO),
    foreign key(QUEWRI_NO)
    references question(WRITE_NO) on update cascade on delete cascade
);

insert into question(TITLE, USER_NM, CONTENTS, WRITE_DT, VIEW_CNT, CATEGORY, USER_PW) 
values('단체 예약을 하고 싶어요', '김태희', '그냥 전화로 연락하면 되나요?', '2018-09-07', 2, '예약', '0000');
insert into question(TITLE, USER_NM, CONTENTS, WRITE_DT, VIEW_CNT, CATEGORY, USER_PW) 
values('이번달에 휴무일이 있나요?', '전지현', '이번달은 셋째주 월요일을 제외하고 정상 영업합니다.', '2018-09-13', 2, '운영', '0000');
insert into question(TITLE, USER_NM, CONTENTS, WRITE_DT, VIEW_CNT, CATEGORY, USER_PW) 
values('건의합니다.', '김태희', '밥의 양이 너무 작습니다. 양을 좀더 들려주세요', '2018-09-14', 2, '건의', '0000');