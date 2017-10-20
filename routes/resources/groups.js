var express = require('express'),
    router = express.Router(),
    logger = require('../../lib/utillity/logger'),
    BL_Groups = require('../../lib/business/groups').BL_Groups,
    Helper = require('../../lib/utillity/helper').Helper;

const resource = 'groups';

//RET Representation State Transfer

/**
 * Retrieves a list of all entities
 */
router.get('/', (req, res, next) => {
    var options = req.query ? Helper.getReadOptions(req.query): {}
    logger.info("ROU [%s] [GET] /%s", req.sessionID, resource);

    BL_Groups.read(req, options, function (err, data) {
        var result = {success: !err, data: data || []};
        res.status(200).send(result);
        res.end();
    })
});

router.get('/tree', (req, res, next) => {
    var options = req.query ? Helper.getReadOptions(req.query): {}
    logger.info("ROU [%s] [GET] /%s", req.sessionID, resource);

    BL_Groups.tree(req, options, function (err, data) {
        var result = {success: !err, children: data || []};
        res.status(200).send(result);
        res.end();
    })
});

/**
 * Retrieves a specific resource
 */
router.get('/:id',(req, res, next) => {
    logger.info("ROU [%s] [GET] /%s/id params %j", req.sessionID, resource, req.params);
    if(req.params && req.params.id){
        BL_Groups.readOne(req, req.params.id, function (err, data) {
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
    logger.info("ROU [%s] [POST] /%s %j", req.sessionID, resource, req.body);
    if(req.body && req.body !== {}) {
        var object = req.body;
        BL_Groups.create(req, req.body, (err, insert) => {
            var response = {success: !err, message: err ? err.errmsg : insert}
            res.status(200).send(response);
            res.end();
        });
    } else {
        var message = 'bady seems empty or invalid';
        logger.error("ROU [%s] [POST] /%s body %j | %s", req.sessionID, resource, req.body, message);        
        res.status(200).send({success: false, message: message});
        res.end();
    }
});

/**
 * Update a entiry
 */

router.put('/:id', function (req, res) {
    logger.info("ROU [%s] [PUT] /%s", req.sessionID, resource);
    
    if(req.body){
        BL_Groups.update(req, req.params.id, req.body, (err, update) => {
            var result = {success: !err, message: err ? err.errmsg : update };
            res.status(200).send(result);
            res.end();        
        });
    }
});

/**
 * Delete a resource
 */
router.delete('/:id', function (req, res) {
    logger.info("ROU [%s] [DELETE] /%s/id %j", resource, req.params);
    if(req.params && req.params.id){
        BL_Groups.delete(req, req.params.id, function (err, remove) {
            var result = {success: !err, message: err ? err.errmsg : remove};
            res.status(200).send(result);
            res.end();        
        });
    }
});

module.exports = router;