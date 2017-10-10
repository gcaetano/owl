var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger');
    

var BL_Base =  function(){};

BL_Base.prototype.read = function(callback){
    var query = {};
    
    Resource.read(collection, {}, function (err, data) {
        logger.info("BSN | business/%s.getAll receive %d records", collection, data.length);    
        callback(err, data);
    })
};

BL_Base.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};    

    Resource.read(collection, query, function (err, data) {
        logger.info("BSN | business/%s.get [%s] receive %j records", collection, id, data);   
        callback(err, data);
    });        
};

BL_Base.prototype.create = function(object, callback){
    object.creation = {
        date: new Date(),
        issuer: 'foo'
    };

    Resource.create(collection, object, function (err, insert) {
        logger.info("BSN | business/%s.insert %j ", collection, insert);   
        callback(err, insert);
    });        
};

BL_Base.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Base.prototype.update = function(id, object, callback){
    object.updated = {
        date: new Date(),
        issuer: 'foo'
    };
    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Base = new BL_Base();