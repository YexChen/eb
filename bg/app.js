//导入相关模块
let db = require("./config/db")
/*
*这里就是我们的主入口了,任何http请求要先发到这里
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
var fileUpload = require("express-fileupload")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article')

//导入mongoose
var mongoose = require("mongoose")

var app = express();

// 模版渲染引擎,在这里选择渲染模板(ejs大法好)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

//这里是路由设置,进行一级路由分发
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',articleRouter)

// app.use(function(req, res, next) {
//   console.log(req.path)
//   next(createError(404));
// });

module.exports = app;
