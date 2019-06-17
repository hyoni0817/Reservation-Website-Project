const pool = require('./dbConnection.js');
class Reser {}

//STEP2 예약 가능 날짜 나타내기
 Reser.getReserDateCheck = function(tempUserNM, tempPhoneNo, maxAge, callback) {

	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
    //해외 서버 사용시 date(RESER_DT) > date(date_add(now(), interval 9 hour)) 로 수정하기
		var sql = 'select DATE_FORMAT(RESER_DT,"%Y-%m-%d") as IMPOSSBLE_DT from reservation3 where (PHONE_NO = ? and USER_NM = ?) and date(RESER_DT) > date(now()) order by RESER_DT;';
		conn.query(sql,[tempPhoneNo, tempUserNM], (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

			var res, impDate;
			var impArr = result[0] || '0'; //예약이 불가능한 데이터 집합
			var obj = {
				MAXAGE : maxAge,
				impDt : impArr
			}

      conn.release();
			callback(null, obj);


		})
	})
}

//STEP3 예약 정보 나타내기
Reser.getReserInfo = function(ReserNo, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);
		var sql = 'select *, DATE_FORMAT(RESER_DT,"%Y-%m-%d") as RESER_DATE, DATE_FORMAT(RESER_DT,"%H:%i:%S") as RESER_TIME  from reservation3 where RESER_NO = ?;';

		conn.query(sql,ReserNo, (err, result) => {
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
					REQ_TERM:result[0].REQ_TERM
				}
        conn.release();
				callback(null, obj);


		})
	})
}

// 예약 글써서 저장
Reser.saveReserStep2 = (tempReserNo, tempPhoneNo, tempUserNM, tempEmail, tempReqTerm, tempTermCk, tempReserDT, numOfPeople, seats, reserWriDT, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
        //공지사항 글 등록하기
        const sql = 'insert into reservation3 set RESER_NO = ?, USER_NM = ?, PHONE_NO = ?,EMAIL = ?, REQ_TERM = ?, TERM_CK = ?,RESER_DT = ?, SEATS_NO = ?, PEOPLE_NUM = ?, RESERWRI_DT = ?;';
        conn.query(sql,[tempReserNo, tempUserNM, tempPhoneNo, tempEmail, tempReqTerm, tempTermCk, tempReserDT, seats, numOfPeople, reserWriDT], (err, results) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
            var result1 = results[0];
            var result2 = results[1];

						conn.release();
            return callback(null, {msg : 'success'});
		});
	});
}

//이미 본인이 예약한 내역이 있는지 체크
Reser.getOverlapReser = (tempUserNM, tempNum, selDateVal, selTimeVal, selSeatsVal, page, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
        //공지사항 글 등록하기
        var reserDt = selDateVal+" "+selTimeVal;
        var overlap;
        var sql, valArr;
        if(page == 'reser'){
          sql = 'select \'Y\' as OVERLAP from reservation3 where RESER_DT = ? and SEATS_NO = ?;';
          valArr = [reserDt, selSeatsVal]
        }else if(page == 'editReser') {
          sql = 'select \'Y\' as OVERLAP from reservation3 where RESER_DT = ? and SEATS_NO = ? and USER_NM != ? and RESER_NO != ?;';
          valArr = [reserDt, selSeatsVal, tempUserNM, tempNum]
        }
        //const sql2 = 'select \'Y\' as SAME_CUSTOMER from reservation where DATE_FORMAT(RESER_DT,"%Y-%m-%d") = ? and USER_NM=? and PHONE_NO=? GROUP BY SAME_CUSTOMER;';
        conn.query(sql,valArr, (err, result) =>{
            if(err) {
                console.error('Error : ', err);
                callback(err, null);
                conn.release();
                return;
            }
            if(result.length == 0) {
    					overlap = 'N';
    				} else {
    					overlap = result[0].OVERLAP;
    				}
						conn.release();
            return callback(null, {overlap : overlap});
		});
	});
}

module.exports = Reser;
