const express = require('express');
const pool = require('../model/dbConnection.js');
const QnA = require('../model/qna.js');

const router = express.Router();

router.route('/qna')
  .get(showQnA);


router.route('/qnaView')
  .get(showQnAWri);


function showQnA(req, res) {
  QnA.getQnAList( req.query,(err, result) => {
    if(err) {
      console.log(err);
      res.status(500).send({msg:'getQnAList error'});
      return;
    }
      res.render('qna.ejs', result);
  }
)}

function showQnAWri(req, res) {
  const wriQnANo = req.query.wriNo;
  const pageNum = req.query.page;
  const inputSuccess = 'N';

  QnA.getQnAWri( req.query, inputSuccess, (err, result) => {
    if(err) {
      res.status(500).send({msg:'getQnAWri error'});
      return;
    }// 비밀글인거 체크하고 보여주기
      res.render('qnaWri.ejs', result);
  })
}



module.exports = router;
