var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utility/logger'),
    ObjectID = require('mongodb').ObjectID;


var BL_Cultures =  function(){};
const collection = 'cultures';


BL_Cultures.prototype.read = function(sessionID, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", sessionID, collection);
    var children = [];
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", sessionID, query, projection, options);
    
    Resource.read(sessionID, collection, query, projection, options, (err, data) => {

        logger.info("BSN [%s] business/%s.getAll receive %d records", sessionID, collection, data.length);    
        callback(err, data);
    })
};

BL_Cultures.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};    

    Resource.read(collection, query, function (err, data) {
        logger.info("BSN [%s] business/%s.get [%s] receive %j records", sessionID, collection, id, data);   
        callback(err, data);
    });        
};

BL_Cultures.prototype.create = function(object, issuer, callback){
    object.creation = { date: new Date(), issuer: issuer };

    Resource.create(collection, object, function (err, insert) {
        logger.info("BSN [%s] business/%s.insert %j ", sessionID, collection, insert);   
        callback(err, insert);
    });        
};

BL_Cultures.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN [%s] business/%s.remove %s %j ", sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Cultures.prototype.update = function(id, object, issuer, callback){
    object.updated = { date: new Date(), issuer: issuer };
    
    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN [%s] business/%s.remove %s %j ", sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Cultures = new BL_Cultures();