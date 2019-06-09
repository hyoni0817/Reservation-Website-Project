const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser'); //이걸 써야 body값을 받는다.
const app = express();


const reserRouter = require('./router/checkReserRouter.js');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your password',
  database: 'your database'
}

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: '#@$RESERVATION#@$#$',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 10} // 수정하기 100에서 10으로
}));

// Add headers
//다음을 추가 안하면 ajax node.js Response to preflight request doesn't pass access control check 와 같은 오류 발생
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended:false})); //이걸 써야 body값을 받는다.
app.use(bodyParser.json()); //이걸 써야 body값을 받는다.

//아래의 미들웨어 함수를 로드할려면 app.get, app.post와 같은 루트경로를 라우팅하기 전에 로드해야한다.
app.use(morgan('dev'));

app.use(reserRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.static('public'));

//하위 경로 설정하기(html에서 css,js,img 파일의 경로를 /img/ 와 같이 해주면 상관없음.)
// app.use('/reser',express.static('public'));
// app.use('/editReser',express.static('public'));

app.use((err, req, res, next) => {
  res.send({error: err.message});
})

// app.use(function(req, res, next) {
//   res.status(404).render('pageErr.html');
// });

app.listen(3000,function () {
  console.log('success');
});
