const express = require('express');
const pool = require('../model/dbConnection.js');
const CheckReser = require('../model/checkReservation.js');
const router = express.Router();

router.route('/')
  .get(showInputReser)
  .post(saveInputReser);

router.route('/reserList')
  .get(showReserInfo);

router.route('/ajaxUserCheck')
  .post(compareReserInfo);

//예약자 정보 입력 페이지 불러오기
function showInputReser(req, res) {
    req.session.destroy(function(err){
      // 세션 정보 파괴
      res.render('InputReserInfo.ejs');
    })
}

//세션에 예약자 정보 저장하기
function saveInputReser(req, res, next) {
  const inputUserName = req.body.inputUserName;
  const inputReserNo = req.body.inputReserNo;

  var userReserInfo = {USER_NM:inputUserName, RESER_NO:inputReserNo};
  req.session.userReserInfo = userReserInfo;
  res.redirect('/reserList');

}

//예약 정보 보여주기
function showReserInfo(req, res) {
  if(req.session.userReserInfo){
    const tempUserName = req.session.userReserInfo.USER_NM;
    const tempReserNo = req.session.userReserInfo.RESER_NO;
    const maxAge = req.session.cookie.maxAge;

    console.log("sess.cookie.maxAge: ",req.session.cookie.maxAge) //수정하기 이게 0이 되면 알림창 띄우고 메인화면으로

    CheckReser.getInputReser(tempUserName, tempReserNo, maxAge, (err, result) => {
      if(err) return next(err);
      res.render('CheckReserInfo.ejs', result);
    });
  } else {
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<script type="text/javascript">');
    res.write('var box = confirm("예약번호와 성함을 먼저 입력해주세요.");');
    res.write('if (box == true) {');
    res.write('window.location.href="/";');//표시
    res.write('}');
    res.write('else {');
    res.write('history.go(-1)'); //이전 페이지로 이동하기
    res.write('}');
    res.write('</script>');
    res.end();
  }
}

//예약한 내역이 있는지 체크
function compareReserInfo(req, res, next) {

  const userName = req.body.userName;
  const reserNum = req.body.reserNum;

  console.log(userName);
  CheckReser.getReserInfoCheck( userName, reserNum, (err, result) => {
    if(err) return next(err);
    console.log(result);
    var responseData = {'result' : 'ok', 'enable' : result.enable}
    res.json(responseData);

  })
}


module.exports = router;
