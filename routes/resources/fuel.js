var express = require('express'),
    router = express.Router(),
    logger = require('../../lib/utillity/logger'),
    BL_Fuel = require('../../lib/business/fuel').BL_Fuel,
    Helper = require('../../lib/utillity/helper').Helper;


 const  resource = 'fuel';

//RET Representation State Transfer

/**
 * Retrieves a list of all entities
 */
router.get('/', (req, res, next) => {
    var options = req.query ? Helper.getReadOptions(req.query): {}
    logger.info("ROU [%s] [GET] /%s", req.sessionID, resource);

    BL_Fuel.read(req.sessionID, options, (err, data) => {
        var result = {success: !err, data: data || []};
        res.status(200).send(result);
        res.end();
    });
});

/**
 * Retrieves a specific resource
 */
router.get('/:id',(req, res, next) => {
    logger.info("ROU | [GET] /%s/id params %j", resource, req.params);
    if(req.params && req.params.id){
        BL_Fuel.readOne(req.params.id, function (err, data) {
            var result = {success: !err, data: data || []};
            res.status(200).send(result);
            res.end();
        })
    }
});

/**
 * Create a resource
 */

router.post('/',(req, res, next) => {
    logger.info("ROU | [POST] /%s %j", resource, req.body);
    if(req.body && req.body !== {}){
        BL_Fuel.create(req.body, req.session.user, (err, insert) => {
            var response = {success: !err, message: err ? err.errmsg : insert}
            res.status(200).send(response);
            res.end();
        });
    } else {
        var message = 'body seems empty or invalid';
        logger.error("ROU | [POST] /%s body %j | %s", resource, req.body, message);        
        res.status(200).send({success: false, message: message});
        res.end();
    }
});

/**
 * Update a entiry
 */

router.put('/:id', function (req, res) {
    logger.info("ROU | [PUT] /%s", resource);
    // res.status(200).send(req.body + " " + req.params.id);
    // res.end();     
    
    if(req.body){
        BL_Fuel.update(req.params.id, req.body, req.session.user, function (err, update) {
            var result = {success: !err, message: update || []};
            res.status(200).send(result);
            res.end();        
        });
    }
});

/**
 * Delete a resource
 */
router.delete('/:id', function (req, res) {
    logger.info("ROU | [DELETE] /%s/id %j", resource, req.params);
    if(req.params && req.params.id){
        BL_Fuel.delete(req.params.id, function (err, remove) {
            var result = {success: !err, message: remove || []};
            res.status(200).send(result);
            res.end();        
        });
    }
});

module.exports = router;