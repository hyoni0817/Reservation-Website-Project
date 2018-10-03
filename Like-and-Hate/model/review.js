const pool = require('./dbConnection.js');
class Review {}

//리뷰 글 리스트
Review.getReviewList = function(query, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);

		var sql = 'select WRITE_NO, TITLE, CONTENTS, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DT, STARS, LIKE_NUM, HATE_NUM from reviews order by WRITE_NO';

		conn.query(sql, (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}
        const totalCount = parseInt(result.length);
        console.log(totalCount);
				const obj = {
          count : totalCount,
					data : result
				}
				callback(null, obj);
				conn.release();

		})
	})
}


//좋아요, 싫어요 개수 저장
Review.saveReactionNum = function( wriNo, reactionST, ipAddr, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		console.log("reactionST:",ipAddr)
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
