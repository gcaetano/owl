var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    ObjectID = require('mongodb').ObjectID;
    

var BL_Fuel =  function(){};
const collection = 'groups';


BL_Fuel.prototype.read = function(sessionID, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", sessionID, collection);
    var children = [];
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", sessionID, query, projection, options);
    
    Resource.read(sessionID, collection, query, projection, options, (err, data) => {

        logger.info("BSN | business/%s.getAll receive %d records", collection, data.length);    
        callback(err, data);
    })
};

BL_Fuel.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};   

    Resource.read(collection, query, function (err, data) {
        logger.info("BSN | business/%s.get [%s] receive %j records", collection, id, data);   
        callback(err, data);
    });        
};

BL_Fuel.prototype.create = function(object, callback){
    object.creation = {
        date: new Date(),
        issuer: 'foo'
    };

    Resource.create(collection, object, function (err, insert) {
        logger.info("BSN | business/%s.insert %j ", collection, insert);   
        callback(err, insert);
    });        
};

BL_Fuel.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Fuel.prototype.update = function(id, object, callback){
    object.updated = {
        date: new Date(),
        issuer: 'foo'
    };
    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Fuel = new BL_Fuel();