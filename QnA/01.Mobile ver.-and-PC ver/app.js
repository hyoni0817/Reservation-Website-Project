const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser'); //이걸 써야 body값을 받는다.
const app = express();

const qnaRouter = require('./router/qnaRouter.js');

 //이걸 써야 body값을 받는다.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//아래의 미들웨어 함수를 로드할려면 app.get, app.post와 같은 루트경로를 라우팅하기 전에 로드해야한다.
app.use(morgan('dev'));
app.use(qnaRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  res.send({error: err.message});
})

app.listen(3000,function () {
  console.log('success');
});
