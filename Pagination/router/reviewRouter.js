const express = require('express');
const router = express.Router();
const Review = require('../model/review.js');


router.route('/')
  .get(showReviewList);


function showReviewList(req, res) {

  Review.getReviewList( req.query,(err, result) => {
    if(err) {
      res.status(500).send({msg:'getReviewList error'});
      return;
    }
    console.log(result)
      res.render('index.ejs', result);
  }
 )}


module.exports = router;
