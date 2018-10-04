const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser'); //이걸 써야 body값을 받는다.
const app = express();
const reviewRouter = require('./router/reviewRouter.js');

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
