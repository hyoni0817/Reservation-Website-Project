const pool = require('./dbConnection.js');
class CheckReser {}

//입력한 예약 내역 불러오기
CheckReser.getInputReser = (tempUserName, tempReserNo, maxAge, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
				var sql = 'select *, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DATE, DATE_FORMAT(RESER_DT,"%H:%i:%S") as RESER_TIME from reservation where RESER_NO = ? and USER_NM = ?;';
        conn.query(sql,[tempReserNo, tempUserName], (err, result) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
						var obj = {
							RESER_NO: result[0].RESER_NO,
							USER_NM: result[0].USER_NM,
							PHONE_NO: result[0].PHONE_NO,
							EMAIL: result[0].EMAIL,
							RESER_DATE: result[0].RESER_DATE,
							RESER_TIME: result[0].RESER_TIME,
							PEOPLE_NUM: result[0].PEOPLE_NUM,
							SEATS_NO: result[0].SEATS_NO,
							MAXAGE:maxAge
						}

						conn.release();
						callback(null, obj);

		});
	});
}

//입력받은 정보로 예약한 내역이 있는지 체크하기
CheckReser.getReserInfoCheck = function(userName, reserNum, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql = 'select \'Y\' as enable from reservation where RESER_NO = ? and USER_NM = ?';

		conn.query(sql, [reserNum, userName], (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}
			if(result.length < 1){
				result = {
					enable : 'N'
				}
			}
				conn.release();
				callback(null, result);
		})
	})
}

module.exports = CheckReser;
