var express = require('express'),
    router = express.Router(),
    user = require('./lib/users');

/* This object has a standard RESTFUL API to handle the users */


/*
 GET /users - Retrieves a list of users
 */
router.get('/users', function (req, res, next) {
    logger.info("POST | /users");
    user.get(undefined, function (err, auth) {
        // req.session.user = auth;
        //if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: []});
    });
});

/*
 GET /users/12 - Retrieves a specific user
 */
router.get('/users/:id', function (req, res, next) {
    logger.info("ROU | /users/id");
    logger.info(req.body.userName);
    user.get(req.body.user, req.body.password, function (err, auth) {
        req.session.user = auth;
        //if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: []});
    });
});

/*
 POST /tickets - Creates a new user
 */
router.post('/users', function (req, res, next) {
    logger.info("ROU | /users/id");
    logger.info(req.body.userName);
    user.create(req.body.user, req.body.password, function (err, auth) {
        req.session.user = auth;
        //if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: []});
    });
});

/*
 PUT /tickets/12 - Updates ticket #12
 */
router.put('/users', function (req, res, next) {
    logger.info("ROU | /users");
    logger.info(req.body.userName);
    user.create(req.body.user, req.body.password, function (err, auth) {
        req.session.user = auth;
        //if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: []});
    });
});

/*
 DELETE /tickets/12 - Deletes ticket #12
 */
router.delete('/users', function (req, res, next) {
    logger.info("ROU | /users");
    logger.info(req.body.userName);
    user.remove(req.body.user, req.body.password, function (err, auth) {
        req.session.user = auth;
        //if (err) res.status(200).send({success: false});
        res.status(200).send({success: true, data: []});
    });
});



module.exports = router;
