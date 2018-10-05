const express = require('express');

const router = express.Router();

//QnA 목록
router.route('/')
  .get(showQnA);

//QnA글 보기
router.route('/qnaView')
  .get(showQnAWri);


function showQnA(req, res) {

  res.render('qna.ejs');

}

function showQnAWri(req, res) {

  res.render('qnaWri.ejs');

}

module.exports = router;
