const express = require('express');
const pool = require('../model/dbConnection.js');
const ListAndPwdQnA = require('../model/ListAndPwd.js');
const DelAndEditQue = require('../model/editAndDelete.js');
const SaveAndViewQnA = require('../model/saveAndView.js');

const router = express.Router();

router.route('/qna')
  .get(showQnA) //QnA 목록 보기
  .post(addNewQuestion); //질문 추가하기

router.route('/qnaView')
  .get(showQnAWri);  //질문 및 답변 글 보기

  router.route('/answerWri')
    .post(addNewAnswerWri); // 답변 추가하기

router.route('/editQuestion')
  .post(UpdateQnAWri); //질문 수정하기

router.route('/questionWri')
  .get(showQnAWriForm); //질문 작성 폼 보여주기

router.route('/secretCheck')
  .get(showSecretCheck) // 비밀글인지 체크하고 비밀번호 적는 폼 보여주기
  .post(inputSecretNum); //비밀번호 입력받고 값을 전달하기

//등록된 QnA글 보기, 카테고리별로 글 보기, 글 검색, 답변 여부 확인, 페이지네이션 소스 코드가 있는 함수
function showQnA(req, res) {
  ListAndPwdQnA.getQnAList( req.query,(err, result) => {
    if(err) {
      res.status(500).send({msg:'getQnAList error'});
      return;
    }
      res.render('qna.ejs', result);
  }
)}

//답변 보기, 조회수 보기, 이전글 및 다음글 보기 소스 코드가 있는 함수
function showQnAWri(req, res) {
  const wriQnANo = req.query.wriNo;
  const pageNum = req.query.page;
  const inputSuccess = 'N'; //비밀번호가 설정되어 있지 않을 떄 설정값

  SaveAndViewQnA.getQnAWri( req.query, inputSuccess, (err, result) => {
    if(err) {
      res.status(500).send({msg:'getQnAWri error'});
      return;
    }// 비밀글인거 체크하고 보여주기

    if(result.data[0].SECRET_ST == 'Y'){
      res.redirect('/secretCheck?page='+pageNum+'&wriNo='+wriQnANo+'&part=queWri');
    } else if(result.data[0].SECRET_ST == 'N') {
        res.render('qnaWri.ejs', result);
    }
  })
}

//req를 통해 받은 쿼리 값을 통해 비밀번호 입력창 보여주는 소스코드
//비밀 번호 입력 받고 글 보는 페이지로 연결해줌.(inputPassword.ejs에서 확인버튼을 통해 제출을 할 때)
function showSecretCheck(req, res) {
  var result = {
    pageNum : req.query.page,
     wriNo : req.query.wriNo,
     stat : req.query.stat,
     part : req.query.part//'queWri'
  }

    res.render('inputPassword.ejs', result);
}

//비밀 번호 입력을 받아 비밀번호가 맞는지 안맞는지 확인 여부를 거치는 소스 코드
function inputSecretNum(req, res, next) {
   const secretNum = req.body.secretNum;
   //비밀 번호가 맞는지 확인하는 소스코드
   ListAndPwdQnA.sendSecretNum( req.query, secretNum, (err, result) => {
     if(err) {
       res.status(500).send({msg:'getQnAList error'});
       return;
     }

     //비밀번호가 맞고 part가 queWri 일 때(단순히 글 보는 작업일 때)
     if(result == 'Y' && req.query.part == 'queWri') {
       const inputSuccess = 'Y';

       SaveAndViewQnA.getQnAWri( req.query, inputSuccess,(err, results) => {
         if(err) {
           res.status(500).send({msg:'getQnAWri error'});
           return;
         }// 비밀글인거 체크하고 보여주기

           res.render('qnaWri.ejs', results);

       })
     } else if(result == 'Y' && req.query.part == 'editAndDelete') {
       //비밀 먼호가 맞고 part가 editAndDelete 일 때(글 수정 및 삭제 할 때)
       const stat = req.query.stat; //수정 인지 삭제인지 상태 확인
       const pageNum = req.query.page; //해당 글이 있던 페이지 번호
       const wriNo = req.query.wriNo; //글 번호
       if(stat == 'edit'){
         //글을 수정할 때
         DelAndEditQue.getEditQnAWri(wriNo,pageNum, (err, result) => {
           if(err) return next(err);

             res.render('editQueWriForm.ejs', result);
         })
       }else if(stat == 'delete') {
         //글 삭제할 때
         DelAndEditQue.deleteQnAWri(wriNo, (err, result) => {
           if(err) return next(err);

             res.redirect('/qna');
         })
       }
     }
      else if(result == 'N') {
        //비밀 번호가 맞지 않을 때
       res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
       res.write('<script type="text/javascript">');
       res.write('alert("비밀번호가 틀립니다. 다시 입력해주세요.");')
       res.write('history.go(-1)');
       res.write('</script>');
       res.end();
     }
   }
)}

//글 작성하는 폼을 보여주는 소스코드
function showQnAWriForm(req, res) {
    res.render('queWriForm.ejs');
}

//질문글 등록하는 소스 코드
function addNewQuestion(req, res, next) {
  var date = new Date();

  const title = req.body.title;
  const username = req.body.userName;
  const inquiry = req.body.inquiry;
  const pw = req.body.password;
  const contents = req.body.contents;
  const secretCK = req.body.secretCheck || 'N';
  const wriDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  SaveAndViewQnA.saveQuestionWri( title, username, inquiry, pw, contents, secretCK, wriDate, (err, result) => {
    if(err) {
      res.status(500).send({msg:'getQnAWri error'});
      return;
    }
      if(err) return next(err);

        res.redirect('/qna');

  })
}

//질문글 수정하는 소스 코드
function UpdateQnAWri(req, res, next) {
    const title = req.body.title;
    const contents = req.body.contents;
    const category = req.body.inquiry;
    const username = req.body.userName;
    const password = req.body.password || 'N';
    const secretCK = req.body.secretCheck || 'N';
    const wriNo = req.body.wriNo;
    const page = req.body.pageNum;

    DelAndEditQue.editSaveQnAWri(wriNo, title, contents, secretCK, category, username, password, (err, result) => {
      if(err) return next(err);

        res.redirect('/qnaView?page='+page+'&wriNo='+wriNo);


    })
}

//질문글에 대한 답변 추가하는 소스코드
function addNewAnswerWri(req, res, next) {
  var date = new Date();

  const queWriNo = req.body.queWriNo;
  const adminName = req.body.adminName;
  const contents = req.body.contents;
  console.log(contents);
  const wriDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  SaveAndViewQnA.saveAnswerWri( queWriNo, adminName, contents, wriDate, (err, result) => {
    if(err) {
      res.status(500).send({msg:'addNewAnswerWri error'});
      return;
    }
      if(err) return next(err);
        res.send(result);
  })
}

module.exports = router;
