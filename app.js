var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Preflight request
// Notifies the server about the type of request it wants to send
// Integrated to prevent option instead of post
var cors = require('cors')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var salonRouter = require('./routes/salon');
var serviceReouter = require('./routes/service');
var addressRouter = require('./routes/address');
var bankdataRouter = require('./routes/bankdata');
var creditcardRouter = require('./routes/creditcard');
var eventRouter = require('./routes/event');
var subscriptionRouter = require('./routes/subscription');
var feedbackRouter = require('./routes/feedback');
var authRouter = require('./routes/auth');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/bntm_database';
//connect database
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
	console.log('Connection to database established successfully');
	console.log(db);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/salon', salonRouter);
app.use('/service', serviceReouter);
app.use('/address', addressRouter);
app.use('/bankdata', bankdataRouter);
app.use('/creditcard', creditcardRouter);
app.use('/event', eventRouter);
app.use('/subscription', subscriptionRouter);
app.use('/feedback', feedbackRouter)
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
