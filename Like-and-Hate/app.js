const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser'); //이걸 써야 body값을 받는다.
const app = express();
const reviewRouter = require('./router/reviewRouter.js');

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

//이걸 써야 body값을 받는다.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(reviewRouter);

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
