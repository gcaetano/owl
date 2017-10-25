var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utility/logger'),
    ObjectID = require('mongodb').ObjectID;


var BL_Profiles =  function(){};
const collection = 'profiles';


BL_Profiles.prototype.read = function(req, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", req.sessionID, collection);
    var children = [];
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", req.sessionID, query, projection, options);
    
    Resource.read(req.sessionID, collection, query, projection, options, (err, data) => {

        logger.info("BSN [%s] business/%s.getAll receive %d records", req.sessionID, collection, data.length);    
        callback(err, data);
    })
};

BL_Profiles.prototype.readOne = function(req, id, callback){
    var query = {_id: new ObjectID(id)};    
    var children = [];
    var projection = {};
    var options = {};

    Resource.read(req.sessionID, collection, query, projection, options, function (err, data) {
        logger.info("BSN [%s] business/%s.get [%s] receive %j records", req.sessionID, collection, id, data);   
        callback(err, data);
    });        
};

BL_Profiles.prototype.create = function(req, object, callback){
    object.creation = { date: new Date(), issuer: req.session.user.username };

    Resource.create(req.sessionID, collection, object, function (err, insert) {
        logger.info("BSN [%s] business/%s.insert %j ", req.sessionID, collection, insert);   
        callback(err, insert.result);
    });        
};

BL_Profiles.prototype.delete = function(req, id, callback){
    Resource.delete(req.sessionID, collection, id, function (err, remove) {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Profiles.prototype.update = function(req, id, object, callback){
    object.updated = { date: new Date(), issuer: req.session.user.username };
    
    Resource.update(req.sessionID, collection, id, object, function (err, remove) {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Profiles = new BL_Profiles();