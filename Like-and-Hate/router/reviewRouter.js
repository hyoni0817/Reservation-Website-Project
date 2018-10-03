const express = require('express');
const router = express.Router();
const Review = require('../model/review.js');

//리뷰 글 목록 페이지 url
router.route('/')
  .get(showReviewList);

//좋아요,싫어요 관련 정보받는 url
router.route('/ajaxSendReaction')
  .post(addNewReactionNum);

function showReviewList(req, res) {

  Review.getReviewList( req.query,(err, result) => {
    if(err) {
      res.status(500).send({msg:'getReviewList error'});
      return;
    }

      res.render('index.ejs', result);
    }
 )}


 function addNewReactionNum(req, res, next) {

   const wriNo = req.body.wriNo; // 리뷰 글 번호(review's writing Number)
   const reactionST = req.body.reactionST; //좋아요나 싫어요를 나타냄(reaction stat)
   const ipAddr = req.body.ipAddr; //좋아요, 싫어요 중복 클릭 방지를 위해 유저의 아이피 주소를 받음.(user's ip Address)

   Review.saveReactionNum( wriNo, reactionST, ipAddr, (err, result) => {
     if(err) return next(err);

     if(result.enable == 'Y') {
       //좋아요나 싫어요를 처음 눌렀을 때
       //When you first pressed the 'like' or the 'hate'
       if(reactionST == 'like'){
         var responseData = {'result' : 'ok', 'likeNum' : result.data[0].LIKE_NUM}
         res.json(responseData);
       }else if(reactionST == 'hate') {
         var responseData = {'result' : 'ok', 'hateNum' : result.data[0].HATE_NUM}
         res.json(responseData);
       }
     }
     else if(result.enable == 'N') {
       //이미 좋아요나 싫어요를 누른 적이 있을 때
       //When you've already presseed the 'like' or the 'hate'
       var responseData = {'result' : 'ok', 'enable' : result.enable, 'reactionST':result.reactionST}
       res.json(responseData);
     }
   })
 }

module.exports = router;
