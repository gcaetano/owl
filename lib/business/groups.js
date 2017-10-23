var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var BL_Groups =  function(){};
const collection = 'groups';

BL_Groups.prototype.read = function(req, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", req.sessionID, collection);
    
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", req.sessionID, query, projection, options);
    
    Resource.read(req.sessionID, collection, query, projection, options, (err, data) => {
        callback(err, data);
    })
};

BL_Groups.prototype.tree = function(req, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", req.sessionID, collection);
    var children = [];
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", req.sessionID, query, projection, options);
    
    Resource.read(req.sessionID, collection, query, projection, options, (err, data) => {

        if(!err){
            for(var i = 0; i< data.length; i++){
                var group = data[i];
                var node = {
                    id : group._id,
                    text: group.alias,
                    users: group.users
                };
                children.push(node);
            }
            logger.info("BSN [%s] result %j", req.sessionID, children);
            callback(err, children);
        } else {
            callback(err, null);
        }
    })
};

BL_Groups.prototype.readOne = function(req, id, callback){
    var query = {_id: new ObjectID(id)};  
    var children = [];
    var projection = {};
    var options = {};
    Resource.read(req.sessionID, collection, query, projection, options, function (err, data) {
        logger.info("BSN [%s] business/%s.get [%s] receive %j records", req.sessionID, collection, id, data);   
        callback(err, data);
    });        
};

BL_Groups.prototype.create = function(req, object, callback){
    object.created = { date: new Date(), issuer: req.session.user.username};
    
    Resource.create(req.sessionID, collection, object, function (err, insert) {
        logger.info("BSN [%s] business/%s.insert %j ", req.sessionID, collection, insert);   
        callback(err, insert);
    });        
};

BL_Groups.prototype.delete = function(req, id, callback){
    Resource.delete(req.sessionID, collection, id, function (err, remove) {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Groups.prototype.update = function(req, id, object, callback){
    object.updated = { date: new Date(), issuer: req.session.user.username};

    Resource.update(req.sessionID, collection, id, object, function (err, update) {
        logger.info("BSN [%s] business/%s.update %s %j ", collection, id, update);   
        callback(err, update);
    });        
};

BL_Groups.prototype.pushUser = function(req, id, userId, callback){
    var modifier = { users: new ObjectID(userId) } ;

    Resource.addToSet(req.sessionID, collection, id, modifier, function (err, update) {
        logger.info("BSN [%s] business/%s.update %s %j ", req.sessionID, collection, id, update);   
        callback(err, update);
    });        
};

BL_Groups.prototype.popUser = function(req, idGroup, idUser, callback){
    var modifier = { users: { $in: [new ObjectID(idUser)]} };

    // {
    //     "users" : {
    //     	$in: [ObjectId("59edf1a3fc0c292b783b97bb")]
    //     }
    // }

    Resource.pull(req.sessionID, collection, idGroup, modifier, function (err, update) {
        logger.info("BSN [%s] business/%s.update %s %j ", req.sessionID, collection, idGroup, update);   
        callback(err, update);
    });        
};

exports.BL_Groups = new BL_Groups();