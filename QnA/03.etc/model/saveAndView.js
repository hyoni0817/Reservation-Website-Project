const pool = require('./dbConnection.js');
class QnA {}

//Q&A 글 보기
QnA.getQnAWri = function(query, inputSuccess, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql = 'select WRITE_NO, TITLE, DATE_FORMAT(WRITE_DT,"%Y-%m-%d") as WRITE_DT, VIEW_CNT, ANSWER_ST, CATEGORY, USER_NM, CONTENTS, SECRET_ST from question where WRITE_NO = ?;';

		conn.query(sql,[query.wriNo], (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

			var sql2 = '';

      //inputSuccess를 통해 값을 비교하지 않으면 비밀번호 입력창에서도 조회수가 증가.
      //왜냐면 어차피 값들이 Y 아니면 N이라서 무조건 증가하는 조건문이기 때문에.
      //inputSuccess가 'Y'인 것은 이미 비밀번호을 옳게 입력하고 들어왔다는 것 의미
      //비밀글을 설정한 적이 없는 글은 inputSuccess 값이 N 이다.
      if(inputSuccess == 'Y' && result[0].SECRET_ST == 'Y') {
        //잠금 설정도 되어있고 비밀 번호도 맞아서 접속에 성공했을 떄 조회수 증가
      	sql2 = 'UPDATE question SET VIEW_CNT = VIEW_CNT + 1 WHERE WRITE_NO ='+query.wriNo + ';';
			} else if(inputSuccess == 'N' && result[0].SECRET_ST == 'N') {
				//비밀글 설정을 하지 않고 비밀번호 입력을 한 적이 없을 때 증가하는 조회수
				sql2 = 'UPDATE question SET VIEW_CNT = VIEW_CNT + 1 WHERE WRITE_NO ='+query.wriNo + ';';
			}

			//이전글 및 다음글을 보여주기 위한 sql문
			var sql3 = 'SELECT t2.type, t2.id, t1.TITLE FROM question t1 INNER JOIN(SELECT \'prev_row\' AS type, MAX(WRITE_NO) AS id FROM question WHERE WRITE_NO < ? UNION ALL SELECT \'next_row\' AS type, MIN(WRITE_NO) AS id FROM question WHERE WRITE_NO > ?) t2 ON t1.WRITE_NO = t2.id;';
			var sql4 = 'SELECT CONTENTS, DATE_FORMAT(ANSWRI_DT,"%Y-%m-%d") as ANSWRI_DT, ADMIN_NM from answer where QUEWRI_NO = ?' ;
			conn.query(sql2+sql3+sql4,[query.wriNo,query.wriNo,result[0].WRITE_NO], (err,results) => {
				if(err) {
						console.error('Error : ', err);
						callback(err, null);
						conn.release();
						return;
				}

				var prevPage = 0, nextPage = 0, prevTitle = 0, nextTitle = 0;
				var answer = {}, adminName, quewriNo, contents;
				var prevAndNextStat = 'Y'; //이전글,다음글 유무

				//이전글, 다음글 보기
				if(results[1].length > 0){
					//게시물이 두개 이상 있을 때 이전글, 다음글 나타내기 위해 사용
					if(results[1][0].type !== 'prev_row') {
						nextPage = results[1][0].id;
						nextTitle = results[1][0].TITLE;
				  } else if(results[1][1] === undefined) {
						prevPage = results[1][0].id;
						prevTitle = results[1][0].TITLE;
					} else {
						prevPage = results[1][0].id;
						prevTitle = results[1][0].TITLE;
						nextPage = results[1][1].id;
						nextTitle = results[1][1].TITLE;
					}
				}else {
					//게시물이 하나만 있을 때 이전글, 다음글 나타내지 않기 위해 사용
					prevAndNextStat = 'N';
				}

				if(result[0].ANSWER_ST == 'Y' ) {
					//답변 내역이 있을 때
					if(results[2] !== undefined) {
						answer = {
							adminName : results[2][0].ADMIN_NM,
						  answriDate : results[2][0].ANSWRI_DT,
							contents : results[2][0].CONTENTS
						}
					}
				} else {
					//답변한 내역이 없을 때
					answer = 0;
 				}

				const obj = {
					paging : {
						page : query.page,
						prevPage :  prevPage,
						nextPage :  nextPage,
						prevTitle : prevTitle,
						nextTitle : nextTitle,
						prevAndNextStat : prevAndNextStat
					},
					data : result,
					ansData : answer
				}
				conn.release();
				callback(null, obj);

			})
		})
	})
}

//질문글 등록하기
QnA.saveQuestionWri = (title, username, inquiry, pw, contents, secretCK, wriDate, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
        //Q&A 글 등록하기
        const sql = 'insert into question set ?;';
				const values = {USER_NM:username, TITLE:title,CATEGORY:inquiry, USER_PW:pw, CONTENTS:contents,WRITE_DT:wriDate, SECRET_ST:secretCK};
				conn.query(sql,values, (err, results) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
						conn.release();
            return callback(null, {msg : 'save question success'});
		});
	});
}

//답변글 등록하기
QnA.saveAnswerWri = ( queWriNo, adminName, contents, wriDate, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
        //질문의 답글 등록하기
        const sql = 'insert into answer set QUEWRI_NO = ?, ADMIN_NM = ?, CONTENTS = ?, ANSWRI_DT = ?;';
				const sql2 = 'UPDATE question SET ANSWER_ST = \'Y\' where WRITE_NO = ?';
				conn.query(sql+sql2,[ queWriNo, adminName, contents, wriDate, queWriNo], (err, results) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
            var result1 = results[0];
            var result2 = results[1];
            console.log(results);
						conn.release();
            return callback(null, {msg : 'success'});
		});
	});
}

module.exports = QnA;
