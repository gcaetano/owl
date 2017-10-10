var express = require('express'),
    router = express.Router(),
    BL_Users = require('../lib/business/users').BL_Users,
    logger = require('../lib/utillity/logger'),
    profiles = require('../lib/business/profiles').Profiles;
    groups = require('../lib/business/groups').Groups;

router.post('/auth', function (req, res, next) {
    BL_Users.auth(req.body.user, req.body.password,  (err, user) => {
        //req.session.user = user;
        if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: user});
    });
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



module.exports = router;
