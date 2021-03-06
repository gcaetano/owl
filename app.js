var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./lib/utility/settings');
var locales = require('./routes/locales');
var security = require('./routes/security');
var groups = require('./routes/resources/groups');
var users = require('./routes/resources/users');
var profiles = require('./routes/resources/profiles');
var cultures = require('./routes/resources/cultures');
var timezones = require('./routes/resources/timezones');
var mobiles = require('./routes/resources/mobiles');
var fuel = require('./routes/resources/fuel');

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var uid = require('uid-safe');
var util = require('util');

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
            uri: util.format('mongodb://%s:%s/owl', settings.mongo.database.owl.host, settings.mongo.database.owl.port),
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

    app.use('/locales', locales);
    app.use('/security', security);
    app.use('/groups', groups);
    app.use('/users', users);
    app.use('/profiles', profiles);
    app.use('/cultures', cultures);
    app.use('/timezones', timezones);
    app.use('/mobiles', mobiles);
    app.use('/fuel', fuel);

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
        res.status(err.status || 500).send({sucess: false, status: err.status, message: err.message});
        // res.render('error');
        res.end();
    });

});

module.exports = app;
