var Resource = require('../data/mongo/resource').Resource,
logger = require('../../lib/utillity/logger');


var BL_Profiles =  function(){};
const collection = 'profiles';


BL_Profiles.prototype.read = function(callback){
    var query = {};

    Resource.read(collection, {}, function (err, data) {
        logger.info("BSN | business/%s.getAll receive %d records", collection, data.length);    
        callback(err, data);
    })
};

BL_Profiles.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};    

    Resource.read(collection, query, function (err, data) {
        logger.info("BSN | business/%s.get [%s] receive %j records", collection, id, data);   
        callback(err, data);
    });        
};

BL_Profiles.prototype.create = function(object, issuer, callback){
    object.creation = { date: new Date(), issuer: issuer };

    Resource.create(collection, object, function (err, insert) {
        logger.info("BSN | business/%s.insert %j ", collection, insert);   
        callback(err, insert);
    });        
};

BL_Profiles.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Profiles.prototype.update = function(id, object, issuer, callback){
    object.updated = { date: new Date(), issuer: issuer };
    
    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Profiles = new BL_Profiles();