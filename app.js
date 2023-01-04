var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessions = require('express-session')
var flash = require('connect-flash')
var app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

//DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/eshedtours',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { console.log("Sucess connecting to db") });
mongoose.set('strictQuery', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Models
const User = require('./models/user');
const Plane = require('./models/plane');
const Flight = require('./models/flight');
const Ticket = require('./models/ticket');
//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(sessions({ secret: 'kanunu', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//authentication setup
passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Flash messages
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.messages = req.flash('success');
  console.log(res.locals.messages);
  next();
});
//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});
app.listen(5555)
module.exports = app;

