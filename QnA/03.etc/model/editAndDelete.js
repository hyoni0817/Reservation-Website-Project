const pool = require('./dbConnection.js');
class QnA {}


//글 삭제하기
QnA.deleteQnAWri = (wriNo, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
      const sql = 'delete from question where WRITE_NO = ?;';
      conn.query(sql,[wriNo], (err, results) =>{
        if(err) {
            console.error('Error : ', err);
            callback(err, null);
            conn.release();
            return;
        }
				conn.release();
        return callback(null, {msg : 'delete question success'});
		});
	});
}

//수정 폼에 보여주기 위한 수정할려고 하는 글의 데이터
QnA.getEditQnAWri = (wriNo, pageNum, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
			var sql = 'select WRITE_NO, TITLE, USER_NM, CATEGORY, CONTENTS, SECRET_ST from question where WRITE_NO = ?;';
      conn.query(sql,wriNo, (err, result) =>{
        if(err) {
            console.error('Error : ', err);
            callback(err, null);
            conn.release();
            return;
        }
				var obj = {
					WRITE_NO:result[0].WRITE_NO,
					TITLE: result[0].TITLE,
					USER_NM: result[0].USER_NM,
					CATEGORY: result[0].CATEGORY,
					CONTENTS: result[0].CONTENTS,
					SECRET_ST: result[0].SECRET_ST,
					pageNum: pageNum
				}

				conn.release();
				callback(null, obj);
		});
	});
}

//글 수정 후 저장
QnA.editSaveQnAWri = (wriNo, title, contents, secretCK, category, username, password, callback) => {
	pool.getConnection( (err, conn) => {
		if(err) return callback(err, null);
			let values = {};

			if(password == 'N') {
				//비밀번호를 수정하지 않았을 떄
				values = {TITLE : title, CONTENTS : contents, SECRET_ST: secretCK, CATEGORY: category, USER_NM: username}
			} else {
				//비밀번호를 수정했을 때
				values = {TITLE : title, CONTENTS : contents, SECRET_ST: secretCK, CATEGORY: category, USER_NM: username, USER_PW:password}
			}
			const sql = 'update question set ? where WRITE_NO = ?;';
      conn.query(sql,[values, wriNo], (err, results) =>{
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
}

module.exports = QnA;
