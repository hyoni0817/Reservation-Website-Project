const express = require('express');
const pool = require('../model/dbConnection.js');
const Reser = require('../model/reservation.js');
const router = express.Router();

router.route('/reser/:page')
  .get(showReserInfo)
  .post(addReserInfo);

  router.route('/ajaxOverlapCheck')
    .post(showOverlapReser);

//예약 정보 입력하기(post)
function addReserInfo(req, res, next) {
  //step1
  var date = new Date();
  var randomNum = date.getHours()+date.getMinutes()+date.getSeconds();
  var reserNum = (date.getFullYear()-2000)+""+date.getMonth()+""+date.getDate()+""+randomNum; //session에 저장시킬거라면 필요NO
  const userName = req.body.userName;
  const phoneNum = req.body.phoneNum;
  const emailText = req.body.emailText;
  const reqTerm = req.body.reqTerm || 'No';
  const termsCheck = req.body.termsCheck;
  //step2
  const selectDate = req.body.selectDate;
  const selcetTime = req.body.selcetTime;
  const seats = req.body.seats;
  const numOfPeople = req.body.numOfPeople;
  const reserWriDT = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  if(req.params.page == 'step1')
  {
    //step1은 예약자 정보 입력하는 페이지
    //동일한 예약 번호에 저장시켜야하기 떄문에 관련 변수 집어넣기
    if(!userName) return res.status(400).send({msg:'userName error'});
    if(!phoneNum) return res.status(400).send({msg:'phoneNum error'});
    if(!emailText) return res.status(400).send({msg:'email error'});
    if(!reqTerm) return res.status(400).send({msg:'reqTerm error'});
    if(!termsCheck) return res.status(400).send({msg:'termsCheck error'});
    var userInfo = {RESER_NO:reserNum, USER_NM:userName, PHONE_NO:phoneNum, EMAIL:emailText, REQ_TERM:reqTerm, TERM_CK:termsCheck}
    req.session.userInfo = userInfo;
    res.redirect('/reser/step2');
  } else if(req.params.page == 'step2')
  {
    //step2는 예약 날짜, 시간, 좌석, 인원수 등의 정보를 입력받는 페이지
    var tempReserNo = req.session.userInfo.RESER_NO;
    var tempPhoneNo = req.session.userInfo.PHONE_NO;
    var tempUserNM = req.session.userInfo.USER_NM;
    var tempEmail = req.session.userInfo.EMAIL;
    var tempReqTerm = req.session.userInfo.REQ_TERM;
    var tempTermCk = req.session.userInfo.TERM_CK;
    var tempReserDT = req.body.selectDate + " " + req.body.selcetTime
    //동일한 예약 번호에 저장시켜야하기 떄문에 관련 변수 집어넣기
    Reser.saveReserStep2(tempReserNo, tempPhoneNo, tempUserNM, tempEmail, tempReqTerm, tempTermCk, tempReserDT, numOfPeople, seats, reserWriDT, (err, result) => {
      if(err) return next(err);
      res.redirect('/reser/step3');
    });
  }
}

//각 스텝별 페이지를 보여줌(get)
function showReserInfo(req, res) {
  //step1을 제외한 stel2, step3는 세션이 만료가 되거나 없으면 페이지를 불러 올 수 없다.
  if(req.params.page == 'step1')
  {
    req.session.destroy(function(err){
      // 세션 정보 파괴
      res.render('ReserStep1.ejs');
  })

  } else if(req.params.page == 'step2') {
      if(req.session.userInfo){ //세션이 만료되지 않고 유효할 때
      var tempUserNM = req.session.userInfo.USER_NM;
      var tempPhoneNo = req.session.userInfo.PHONE_NO;
      var maxAge = req.session.cookie.maxAge;
      Reser.getReserDateCheck( tempUserNM, tempPhoneNo, maxAge,(err, result) => {

        if(err) {
          res.status(500).send({msg:'getReserDateCheck error'});
          return;
        }

          res.render('ReserStep2.ejs',result);
      }
    )
  } else { //maxAge에 도달해서 세션이 만료되었을 때
      res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
      res.write('<script type="text/javascript">');
      res.write('var box = confirm("예약자 정보를 먼저 입력해주세요.");');
      res.write('if (box == true) {');
      res.write('window.location.href="/reser/step1";');
      res.write('}');
      res.write('else {');
      res.write('history.go(-1)'); //이전 페이지로 이동하기
      res.write('}');
      res.write('</script>');
      res.end();
    }
  }
  else if(req.params.page == 'step3')
  {
    if(req.session.userInfo){
      var ReserNo = req.session.userInfo.RESER_NO; //cannot property undefined 오류가 발생했을 때 체크
      Reser.getReserInfo(ReserNo,(err, result) => {
        if(err) {
          res.status(500).send({msg:'getNoticeList error'});
          return;
        }
        req.session.destroy(function(err){
          // 세션 정보 파괴
          res.render('ReserStep3.ejs', result);
        })


      });
    } else {
      res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
      res.write('<script type="text/javascript">');
      res.write('var box = confirm("예약자 정보를 먼저 입력해주세요.");');
      res.write('if (box == true) {');
      res.write('window.location.href="/reser/step1";');
      res.write('}');
      res.write('else {');
      res.write('history.go(-1)'); //이전 페이지로 이동하기
      res.write('}');
      res.write('</script>');
      res.end();
    }
  }
}

//이미 같은 날에 같은 좌석, 시간, 좌석이 중복되는 예약 내역이 있는지 체크
//Ajax 관련 함수
function showOverlapReser(req, res, next) {
  var tempUserNM,tempPhoneNo;
  var page = req.body.page;

  tempUserNM = req.session.userInfo.USER_NM;
  tempNum = req.session.userInfo.PHONE_NO;


  var selDateVal = req.body.selDateVal;
  var selTimeVal = req.body.selTimeVal;
  var selSeatsVal = req.body.selSeatsVal;

  Reser.getOverlapReser( tempUserNM, tempNum, selDateVal, selTimeVal, selSeatsVal, page, (err, result) => {
    if(err) return next(err);
    var responseData = {'result' : 'ok', 'overlap' : result.overlap};
    res.json(responseData);

  })
}

module.exports = router;
