const pool = require('./dbConnection.js');
class QnA {}

//Q&A 글 리스트
QnA.getQnAList = function(query, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);

		const page = parseInt(query.page) || 1;
		const contents = query.searchContent || 0;
		const ansNum = query.answer || 0;
		var sql = 'select WRITE_NO, TITLE, DATE_FORMAT(WRITE_DT,"%Y-%m-%d") as WRITE_DT, CATEGORY, ANSWER_ST, USER_NM, VIEW_CNT,SECRET_ST from question order by WRITE_NO desc';
		var ansWhere ='';

		//답변 여부 체크
		if(ansNum) {
			if(ansNum == 0) {
				ansWhere = '';
			} else if(ansNum == 1) {
				ansWhere += 'ANSWER_ST = \'Y\'';
			}
		}

		conn.query(sql, (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

			//qna글의 페이지수 계산
			const totalCount = parseInt(result.length);
			const maxPage = Math.ceil(totalCount / 10); //ceil함수는 소수점 이하 모두 올림
			const offset = 10 * (page - 1);

			const sql2 = sql + ' limit 10'+ ' offset ?;';
			conn.query(sql2, offset, (err, results) => {
				if(err) {
						console.error('Error : ', err);
						callback(err, null);
						conn.release();
						return;
				}
				const obj = {
					paging : {
						total : totalCount,
						maxPage : maxPage,
						page : page,
						count : results.length
					},
					stat : {
						contents : contents,
						ansNum : ansNum
					},
					data : results
				}
				conn.release();
				callback(null, obj);

			})
		})
	})
}

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

			//이전글 및 다음글을 보여주기 위한 sql문
			var sql2 = 'SELECT t2.type, t2.id, t1.TITLE FROM question t1 INNER JOIN(SELECT \'prev_row\' AS type, MAX(WRITE_NO) AS id FROM question WHERE WRITE_NO < ? UNION ALL SELECT \'next_row\' AS type, MIN(WRITE_NO) AS id FROM question WHERE WRITE_NO > ?) t2 ON t1.WRITE_NO = t2.id;';
			var sql3 = 'SELECT CONTENTS, DATE_FORMAT(ANSWRI_DT,"%Y-%m-%d") as ANSWRI_DT, ADMIN_NM from answer where QUEWRI_NO = ?' ;
			conn.query(sql2+sql3,[query.wriNo,query.wriNo,result[0].WRITE_NO], (err,results) => {
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
				if(results[0].length > 0){
					//게시물이 두개 이상 있을 때 이전글, 다음글 나타내기 위해 사용
					if(results[0][0].type !== 'prev_row') {
						nextPage = results[0][0].id;
						nextTitle = results[0][0].TITLE;
				  } else if(results[0][1] === undefined) {
						prevPage = results[0][0].id;
						prevTitle = results[0][0].TITLE;
					} else {
						prevPage = results[0][0].id;
						prevTitle = results[0][0].TITLE;
						nextPage = results[0][1].id;
						nextTitle = results[0][1].TITLE;
					}
				}else {
					//게시물이 하나만 있을 때 이전글, 다음글 나타내지 않기 위해 사용
					prevAndNextStat = 'N';
				}

				if(result[0].ANSWER_ST == 'Y' ) {
					//result 결과 내기
					if(results[2] !== undefined) {
						answer = {
							adminName : results[2][0].ADMIN_NM,
						  answriDate : results[2][0].ANSWRI_DT,
							contents : results[2][0].CONTENTS
						}
					}
				} else {
					answer = 0;
 				}

				var reContents = (result[0].CONTENTS).replace(/(?:\r\n|\r|\n)/g, '<br/>');
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

module.exports = QnA;
