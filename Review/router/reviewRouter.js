const express = require('express');
const formidable = require('formidable');
const url = require('url'); // url 검색하기
const router = express.Router();
const Review = require('../model/reviews.js');


/*이미지 업로드 */
const fs = require('fs');
const pathUtil = require('path');
const async = require('async');
const uploadDir = './upload'
/*아마존*/
var AWS = require('aws-sdk');
AWS.config.region = "Input your region";
AWS.config.accessKeyId = "Your accessKeyId";
AWS.config.secretAccesskey = "Your secretAccesskey";
var s3 = new AWS.S3();
const bucketName = 'Your BucketName';

//upload 파일을 생성하지 않으면 오류가 발생합니다.
//upload 파일 생성 경로는 / 에 폴더를 생성해주세요.
if(!fs.existsSync(uploadDir)) {
  console.error('upload 폴더 없음!');
  process.exit();
}

//작성한 리뷰 목록을 보여줍니다.
router.route('/')
  .get(showReviewList);

//예약자들의 정보를 입력하여 리뷰 작성 여부를 체크합니다.
router.route('/checkReserUser')
  .get(showReserUser)
  .post(inputUserInfo)

// 리뷰 작성 폼을 보여줍니다.
router.route('/reviewWri')
  .post(addNewReviewWri);

//각 리뷰의 좋아요,싫어요 관련 정보받는 url
router.route('/ajaxSendReaction')
  .post(addNewReactionNum);

function showReviewList(req, res) {

  Review.getReviewList( req.query,(err, result) => {
    if(err) {
      res.status(500).send({msg:'getReviewList error'});
      return;
    }
      res.render('reviewList.ejs', result);
    }
 )}

 //예약자 정보를 입력하는 폼을 보여줍니다.
 function showReserUser(req, res) {
     res.render('checkReserUser.ejs');

 }

//새로운 리뷰 추가
function addNewReviewWri(req, res, next) {
  //s3를 이용하여 이미지 파일을 등록할 때
  async.waterfall([
    (done) => {
      //파일을 업로드 할 떄는 formidable을 사용합니다.
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.uploadDir = uploadDir;
      form.keepExtension = true;
      form.multiples = true;

      form.parse(req, (err, fields, files) => {
        if(err) {
          return done(err);
        }
        var date = new Date();

        const title = fields['title'];
        var reviewImg = files['reviewImg'];
        const contents = fields['contents'];
        const reserNo = fields['reserNo'];
        const reserDt = fields['reserDt'];
        const stars = fields['stars'];
        const wriDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        if(!title) return res.status(400).send({msg:'title error'});
        if(!reviewImg) return res.status(400).send({msg:'reviewImg error'});
        if(!contents) return res.status(400).send({msg:'contents error'});
        if(!reserNo) return res.status(400).send({msg:'reserNo error'});
        if(!stars) return res.status(400).send({msg:'stars error'});

        if(reviewImg == null) {
          reviewImg = '0';
        }
        done(null, title, reviewImg, contents, reserNo, stars, wriDate, reserDt);
      });
    },
    (title, reviewImg, contents, reserNo, stars, wriDate, reserDt, done) => {
      const now = new Date();
      if(reviewImg == '0') {
        return done(null, title, reviewImg, contents, reserNo, stars, wriDate, reserDt);
        }
        const contentType = reviewImg.type;
        const readStream = fs.createReadStream(reviewImg.path);
        const ext = pathUtil.extname(reviewImg.name);
        // 이미지 파일 이름은 랜덤으로 생성해줍니다.
        const reviewImgFile = 'image_' + now.getHours() + now.getMinutes() + now.getSeconds() + ext;
        const itemKey = 'review/' + reviewImgFile;

        const params = {
          Bucket : bucketName,
          Key : itemKey, //K는 대문자로 시작한다. 유의하기!
          ACL : 'public-read',
          Body : readStream,
          ContentType : contentType
        }

        const imageUrl = s3.endpoint.href + bucketName + '/' + itemKey;

        s3.putObject(params, function(err, data) {
          if(err) {
            console.error('S3 PutObject Error', err);
            return done(err);
          }

          return imageUrl;

        });
        done(null, title, imageUrl, contents, reserNo, stars, wriDate, reserDt);
      },
      (title, imageUrl, contents, reserNo, stars, wriDate, reserDt, done) => {
        if(imageUrl == undefined)
        {
          imageUrl = '0';
        }
        // 매개변수를 전달 받아서 리뷰글을 저장
        Review.saveReviewWri(title, imageUrl, contents, reserNo, stars, wriDate, reserDt, (err, result) => {
          if(err) return next(err);
            res.redirect('/');
        });
      }
  ], (err) => {
    if(err) {
      throw err;
    }
  });
}

  //사용자의 정보를 입력받아 예약자인지 아닌지 체크
 function inputUserInfo(req, res, next) {
   var date = new Date();

   const userName = req.body.userName;
   const phoneNum = req.body.phoneNum;

   Review.checkUserInfo( userName, phoneNum, (err, result) => {
     if(err) return next(err);
     if(result === 'Y') {
       Review.showReviewForm( userName, phoneNum, (err, results) => {
           if(err) return next(err);
           res.render('reviewWri.ejs', results);
       })
     }else {
       res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
       res.write('<script type="text/javascript">');
       res.write('alert("등록된 예약 정보가 없습니다. 입력을 다시 확인해주세요.");')
       res.write('history.go(-1)'); // 이전 페이지로 이동하기
       res.write('</script>');
       res.end();
     }
   })
 }

 //좋아요, 싫어요 선택에 따른 값 처리
 function addNewReactionNum(req, res, next) {

   const wriNo = req.body.wriNo;
   const reactionST = req.body.reactionST;
   const ipAddr = req.body.ipAddr;

   Review.saveReactionNum( wriNo, reactionST, ipAddr, (err, result) => {
     if(err) return next(err);
     if(result.enable == 'Y') {
       //좋아요나 싫어요를 처음 눌렀을 때
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
       var responseData = {'result' : 'ok', 'enable' : result.enable, 'reactionST':result.reactionST}
       res.json(responseData);
     }
   })
 }
module.exports = router;
