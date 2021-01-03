var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// var dotenv = require('dotenv')
// const mariadb = require('mariadb/callback');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
// });
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teacherRouter = require('./routes/teacher');
var studentRouter = require('./routes/student');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        message: err.message
    })
})

module.exports = app;
