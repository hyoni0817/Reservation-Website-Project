create table reviews(
WRITE_NO int(10) auto_increment,
TITLE varchar(45) not null,
STARS int(1) not null,
CONTENTS text not null,
RESER_DT datetime not null,
primary key(WRITE_NO)
); 


insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('맛있어요',5,'식당이 깔끔하고 좋네요','2017-11-29 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('추천해요',4,'정말 맛있어요 꼭 오세요','2017-08-09 16:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('또 올래요',5,'직원들이 다들 친절하네요. 음식도 맛있네요.','2017-10-28 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('후기 입니다',3,'대기 시간이 길어서 점심시간에 빨리 먹고 가기에는 무리에요.','2018-08-07 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('보통이에요',3,'음식맛은 그냥 그저 그런것 같아요','2017-08-25 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('다음에 또 올게요',4,'가족들이 다들 좋아했어요. 또 올게요','2018-11-04 16:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('음식이 더 다양했으면',2,'생긴지 얼마 안돼서 그런지 음식 종류가 적어서 아쉬워요','2017-11-25 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('시끄럽지 않아서 좋아요',4,'제가 간 시간에는 그렇게 시끄럽지 않아서 음식에 집중하며 먹을 수 있어서 좋았아요.','2018-12-02 16:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('점심엔 대기가 길어요',4,'대기줄은 길었지만 맛있어서 좋았습니다.','2018-04-29 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('추천합니다',5,'호불호 갈리는 음식은 없어서 대체적으로 좋았어요','2018-01-25 16:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('친절해요',4,'직원들 서비스 때문에 재방문 했으면 좋겠어요.','2018-03-03 12:30:00');
insert into reviews(TITLE,STARS,CONTENTS,RESER_DT) values('서비스가 좋아요',5,'또 방문할게요. 좋은 기억으로 남았어요','2018-12-23 16:30:00');