const pool = require('./dbConnection.js');
class Review {}

//이벤트 글 리스트
Review.getReviewList = function(query, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);

		const page = parseInt(query.page) || 1;
    var sql = 'select WRITE_NO, TITLE, CONTENTS, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DT, STARS, LIKE_NUM, HATE_NUM from reviews order by WRITE_NO';

		conn.query(sql, (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

			const totalCount = parseInt(result.length);
			const maxPage = Math.ceil(totalCount / 6); //ceil함수는 소수점 이하 모두 올림
			const offset = 10 * (page - 1);
			console.log(offset);
			const sql2 = sql + ' limit 10'+ ' offset ?;'; //한 페이지당 10개씩 보여주기

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
				}
				console.log(sql2);
				console.log(obj);
				callback(null, obj);
				conn.release();
			})
		})
	})
}



module.exports = Review;
