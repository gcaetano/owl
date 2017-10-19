var express = require('express'),
    router = express.Router(),
    BL_Users = require('../lib/business/users').BL_Users,
    logger = require('../lib/utillity/logger'),
    profiles = require('../lib/business/profiles').Profiles;
    groups = require('../lib/business/groups').Groups;

router.post('/auth', function (req, res, next) {
    logger.info('ROU [%s] /security/auth [%s]', req.sessionID, req.body.username);
    BL_Users.auth(req.sessionID, req.body.username, req.body.password,  
        (err, user) => {            
            if (err || user == null) {
                res.status(200).send({success: false, data: null});
            } else {
                req.session.user = user;
                res.status(200).send({success: true, data: user});
            }
        }
    );
});

router.get('/logout', function (req, res, next) {
    logger.info('ROU [%s] /security/logout', req.sessionID);   
    req.session.destroy(function(err) {
        var result = {success: true};
        res.status(200).send(result);
    });
});

router.get('/touch', function (req, res) {
    logger.info('ROU [%s] /security/toutch', req.sessionID);
    var result = {
        success: true,
        user: req.session.user
    };
    res.status(200).send(result);
});


module.exports = router;
