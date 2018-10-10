const pool = require('./dbConnection.js');
class QnA {}

//Q&A 글 리스트
QnA.getQnAList = function(query, callback) {
	pool.getConnection((err, conn) => {
		if(err) return callback(err, null);

		const page = parseInt(query.page) || 1;
		const inqNum = query.inquiry || 0;
		const condiNum = query.condition || 0;
		const contents = query.searchContent || 0;//2자 이상 입력하게하기
		const ansNum = query.answer || 0;
		var sql = 'select WRITE_NO, TITLE, DATE_FORMAT(WRITE_DT,"%Y-%m-%d") as WRITE_DT, CATEGORY, ANSWER_ST, USER_NM, VIEW_CNT,SECRET_ST from question';
		var where ='', inqWhere ='', ansWhere ='';
		//검색할 때 제목과 내용 같이 검색, 제목만 검색, 내용만 검색, 작성자 검색 으로 나눠서 검색할 수 있다.
		if(condiNum && contents.length > 0) {
			if(condiNum == 1) {
				where += '(TITLE like \'%' + contents + '%\' OR CONTENTS like \'%' + contents + '%\')';
			} else if(condiNum == 2) {
				where += '(TITLE like \'%' + contents + '%\')';
			} else if(condiNum == 3){
				where += '(CONTENTS like \'%' + contents + '%\')';
			} else if(condiNum == 4){
				where += '(USER_NM like \'%' + contents + '%\')';
			}
		}

		//질문 카테고리 나눠서 검색하기
		if(inqNum) {
			if(inqNum == 1) {
				inqWhere += 'CATEGORY = \'예약\'';
			} else if(inqNum == 2){
				inqWhere += 'CATEGORY = \'운영\'';
			} else if(inqNum == 3){
				inqWhere += 'CATEGORY = \'기타\'';
			} else if(inqNum == 4){
				inqWhere += 'CATEGORY = \'건의\'';
			}
		}

		//답변 여부 선택해서 답변 완료된 글만 보기 가능
		if(ansNum) {
			if(ansNum == 0) {
				ansWhere = '';
			} else if(ansNum == 1) {
				ansWhere += 'ANSWER_ST = \'Y\'';
			}
		}

		//위의 소스 코드를 통해 where절에 추가된 내용이 있는지 확인후 기존 sql문에 덧붙인다.
		var addSql = sql;
		if(where.length>0){
			addSql += ' where ' + where;
		}
		if(where.length>0 && inqWhere.length>0){
			addSql += ' and ' + inqWhere;
		} else if(where.length<=0 && inqWhere.length>0) {
			addSql += ' where ' + inqWhere;
		}

		if((where.length>0 || inqWhere.length>0) && ansWhere.length>0){
			addSql += ' and ' + ansWhere;
		} else if((where.length<=0 && inqWhere.length<=0) && ansWhere.length>0) {
			addSql += ' where ' + ansWhere;
		}

		addSql += ' order by WRITE_NO desc';

		conn.query(addSql, (err, result) => {
			if(err) {
					console.error('Error : ', err);
					callback(err, null);
					conn.release();
					return;
			}

			const totalCount = parseInt(result.length);
			const maxPage = Math.ceil(totalCount / 10); //ceil함수는 소수점 이하 모두 올림
			const offset = 10 * (page - 1);

			const sql2 = addSql + ' limit 10'+ ' offset ?;';
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
						inqNum : inqNum,
						condiNum : condiNum,
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

//잠금글 보기, 글 수정 및 글 삭제 시 비번 체크
QnA.sendSecretNum = (query, secretNum, callback) => {
	pool.getConnection ((err, conn) => {
		if(err) return callback(err, null);

		const sql = 'select \'Y\' as STAT from question where WRITE_NO = ? and USER_PW = ?';
		conn.query(sql,[query.wriNo, secretNum], (err, results) =>{
				if(err) {
						console.error('Error : ', err);
						callback(err, null);
						conn.release();
						return;
				}
				var checkST;
				if(results.length == 0) {
					//비밀번호가 틀렷을 때
					checkST = 'N';
				} else {
					//비밀번호가 맞았을 떄 results배열에 나온 결과값을 저장함.
					checkST = results[0].STAT;
				}
				conn.release();
				return callback(null, checkST);
			});
	})
}

module.exports = QnA;
