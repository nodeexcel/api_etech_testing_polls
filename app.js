var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dbconURL = "mongodb+srv://rohit_excel:mqQ8DIF40cst12Gg@cluster0.ugmkv.mongodb.net/etech_testing_api?retryWrites=true&w=majority"
var routes = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors');




var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose
	.connect(dbconURL, { useNewUrlParser: true })
	.then(() => {

		app.listen(3031, function() {
            console.log('app listening on port 3031! new');
        });
	})
module.exports = app;


// mongoose.connect()

// mongoose
// 	.connect(,{ useNewUrlParser: true })
// 	.then(() => {
// 		app.listen(3031, function() {
//             console.log('app listening on port 3031!');
//         });
// 	}).catch(e=>console.log)


    //mongodb+srv://rohit_excel:mqQ8DIF40cst12Gg@cluster0.ugmkv.mongodb.net/etech_testing_api

    //mongodb+srv://rohit_excel:mqQ8DIF40cst12Gg@cluster0.ugmkv.mongodb.net/etech_testing_api?retryWrites=true&w=majority