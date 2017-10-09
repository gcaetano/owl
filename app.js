var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var locales = require('./routes/locales');
var security = require('./routes/security');


var groups = require('./routes/resources/groups');
var users = require('./routes/resources/users');

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var uid = require('uid-safe');

var app = express();

var MongoDb = require('./lib/data/mongo/connect').Db
MongoDb.openOwlConnection(function (db) {

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


    var store = new MongoDBStore(
        {
            uri: 'mongodb://localhost:27017/owl',
            collection: 'sessions'
        });

    app.use(require('express-session')({
        secret: 'wol_secret',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store,
        resave: true,
        saveUninitialized: true
    }));


    // app.use('/', index);

    // app.use('/locales', locales);
    // app.use('/security', security);

    app.use('/groups', groups);
    app.use('/users', users);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
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

});

module.exports = app;
