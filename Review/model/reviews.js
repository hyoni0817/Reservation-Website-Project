const pool = require('./dbConnection.js');
class Review {}

// 리뷰 글 등록하여 저장합니다.
Review.saveReviewWri = (title, reviewImg, contents, reserNo, stars, wriDate, reserDt, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
		const sql = 'select DATE_FORMAT(RESER_DT,"%Y-%m-%d %H:%i") as RESER_DT from reservation where RESER_NO = ?;'
		conn.query(sql,reserNo, (err, result) =>{
				if(err) {
						console.error('Error : ', err);
						callback(err, null);
						conn.release();
						return;
				}
				var reserDt = result[0].RESER_DT;
				const sql2 = 'insert into reviews set TITLE = ?, IMAGE = ?, CONTENTS = ?, RESER_NO = ?, STARS = ?, WRITE_DT = ?, RESER_DT = ?;';
				const sql3 = 'UPDATE reservation SET REVIEW_ST = \'Y\' WHERE RESER_NO = ?;';
				conn.query(sql2 + sql3,[title, reviewImg, contents, reserNo, stars, wriDate, reserDt, reserNo], (err, results) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
						conn.release();
            return callback(null, {msg : 'success'});
			});
		});
	});
}

//리뷰 글 리스트를 보여줍니다.
Review.getReviewList = function(query, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);

		const page = parseInt(query.page) || 1;
		const arr = query.arr || 'newest';
		var sql;
		if(arr === 'newest') { // 최신글 순
			sql = 'select WRITE_NO, TITLE, CONTENTS, IMAGE, RESER_NO, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DT, STARS, LIKE_NUM, HATE_NUM from reviews order by RESER_DT desc, WRITE_DT';
		}else if(arr === 'like') { //좋아요 순
			sql = 'select WRITE_NO, TITLE, CONTENTS, IMAGE, RESER_NO, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DT, STARS, LIKE_NUM, HATE_NUM from reviews order by LIKE_NUM desc, WRITE_DT';
		}else if(arr === 'score') { //별점 순
			sql = 'select WRITE_NO, TITLE, CONTENTS, IMAGE, RESER_NO, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DT, STARS, LIKE_NUM, HATE_NUM from reviews order by STARS desc, WRITE_DT';
		}
		conn.query(sql, (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

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
					data : results,
					arr : arr
				}
				callback(null, obj);
				conn.release();
			})
		})
	})
}

// 리뷰 작성 가능한 예약자 확인합니다.
Review.checkUserInfo = function( userName, phoneNum, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql1 = 'select \'Y\' as stat from reservation where USER_NM = ? and PHONE_NO = ? and RESER_ST != 2 GROUP BY stat; ' //예약 내역 확인
		var sql2 = 'select \'Y\' AS cancel FROM reservation where USER_NM = ? and PHONE_NO = ? and RESER_ST = 2;' //취소 내역 확인
		conn.query(sql1+sql2,[userName, phoneNum, userName, phoneNum], (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}
			var stat;

			if(result[0].length < 1){
				stat = 'N';
			} else {
				stat = result[0][0].stat;
			}
			if(result[1].length < 1){
				cancel = 'N';
			} else {
				cancel = result[1][0].cancel;
			}

			conn.release();
			callback(null, stat); //여기 다시 손보기! 취소했는데도 이미 리뷰작성을 완료했습니다 뜸.

		})
	})
}
// 취소한 내역을 제외한 리뷰 작성이 가능한 날짜와 리뷰 작성 폼을 보여즙니다.
Review.showReviewForm = function( userName, phoneNum, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql = 'SELECT count(RESER_NO) as REVIEW_NUM FROM reservation where ((REVIEW_ST = \'N\' and USER_NM = ?) and PHONE_NO = ?) and RESER_ST = 1 and RESER_DT <= date_add(date_add(now(),interval 9 hour), interval -1 hour) ;'
		var sql2 = 'select RESER_NO, DATE_FORMAT(RESER_DT,"%Y-%m-%d %H:%i") as RESER_DT, REVIEW_ST from reservation where ((USER_NM = ? and PHONE_NO = ?) and RESER_ST = 1) and RESER_DT <= date_add(date_add(now(),interval 9 hour), interval -1 hour) order by RESER_DT; '
		conn.query(sql+sql2,[userName, phoneNum, userName, phoneNum], (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}
				var obj = {
					reviewNum : result[0][0].REVIEW_NUM,
					count : result[1].length,
					data : result[1]
				}
				conn.release();
				callback(null, obj);

		})
	})
}

// 좋아요, 싫어요 반응을 저장합니다.
Review.saveReactionNum = function( wriNo, reactionST, ipAddr, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql = 'select \'Y\' as checkST, REACTION_ST from review_reaction where WRITE_NO = ? and IP_ADDR = ?;';
		conn.query(sql,[wriNo, ipAddr], (err, results) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}
			if(results.length > 0) {
				conn.release();
				callback(null, {enable: 'N', reactionST: results[0].REACTION_ST});
			} else {
				var sql2 = 'insert into review_reaction set WRITE_NO = ?, REACTION_ST = ?, IP_ADDR = ?;'
				var sql3, sql4;
				if(reactionST == 'like') {
					sql3 = 'UPDATE reviews SET LIKE_NUM = LIKE_NUM + 1 WHERE WRITE_NO = ?;';
					sql4 = 'select LIKE_NUM from reviews where WRITE_NO = ?;'
				} else if (reactionST == 'hate') {
					sql3 = 'UPDATE reviews SET HATE_NUM = HATE_NUM + 1 WHERE WRITE_NO = ?;';
					sql4 = 'select HATE_NUM from reviews where WRITE_NO = ?;'
				}
				conn.query(sql2+sql3+sql4,[wriNo, reactionST, ipAddr, wriNo, wriNo], (err, result) => {
					if(err) {
							console.error('Error : ', err);
							callback(err, null);
							conn.release();
							return;
					}
					var obj = {
						enable : 'Y',
						data : result[2]
					};
						conn.release();
						callback(null, obj);
				})
			}
		})
	})
}


module.exports = Review;
