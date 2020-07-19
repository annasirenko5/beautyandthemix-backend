const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Preflight request
// Notifies the server about the type of request it wants to send
// Integrated to prevent option instead of post
const cors = require('cors');

const middlewares = require("./middlewares");

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const salonRouter = require('./src/routes/salon');
const serviceRouter = require('./src/routes/service');
const addressRouter = require('./src/routes/address');
const eventRouter = require('./src/routes/event');
const subscriptionRouter = require('./src/routes/subscription');
const feedbackRouter = require('./src/routes/feedback');
const authRouter = require('./src/routes/auth');
const pdfRouter = require('./src/routes/pdf');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/bntm_database';
//connect database
mongoose.connect(mongoDB, {useNewUrlParser: true});
const db = mongoose.connection;
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

app.use(cors());

app.use(middlewares.allowCrossDomain);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/salon', salonRouter);
app.use('/service', serviceRouter);
app.use('/address', addressRouter);
app.use('/event', eventRouter);
app.use('/subscription', subscriptionRouter);
app.use('/feedback', feedbackRouter)
app.use('/auth', authRouter);
app.use('/pdf', pdfRouter)

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
