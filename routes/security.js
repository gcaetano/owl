var express = require('express'),
    router = express.Router(),
    user = require('./lib/users'),
    logger = require('../lib/utillity/logger'),
    profiles = require('../lib/business/profiles').Profiles;
    locales = require('../lib/business/locales').Locales;
    groups = require('../lib/business/groups').Groups;

router.post('/login', function (req, res, next) {
    user.makeAuth(req.body.user, req.body.password, function (err, auth) {
        req.session.user = auth;
        if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: auth});
    });

    //if(req.session.user) {
    //    res.status(200).send({success: true, data: req.session.user});
    //} else {
    //    user.makeAuth(req.body.user, req.body.password, function (err, auth) {
    //        req.session.user = auth;
    //        if (err) res.status(200).send({success: false});
    //        res.status(200).send({success: true, data: auth});
    //    });
    //}
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function(err) {
        var result = {success: true};
        res.status(200).send(result);
    });
});

router.get('/touch', function (req, res) {
    var result = {
        success: true,
        data: req.session.user
    };
    res.status(200).send(result);
});

router.get('/profiles', function (req, res) {
    logger.info("ROU | /security/profiles");

    profiles.getAll(function (err, data) {
        var result = {success: !err, data: data || []};
        res.status(200).send(result);
    })
});

router.get('/locale', function (req, res) {
    logger.info("ROU | /security/profiles");

    locales.getAll(function (err, data) {
        var result = {success: !err, data: data || []};
        res.status(200).send(result);
    })
});

// router.get('/groups', function (req, res) {
//     logger.info("ROU | /security/groups");
//     groups.getAll(function (err, data) {
//         var result = {success: !err, children: data || []};
//         res.status(200).send(result);
//     })
// });


module.exports = router;
