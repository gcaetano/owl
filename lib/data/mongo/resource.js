/**
 * All operations over mongodb collection are handled here.
 */

var logger = require('../../../lib/utillity/logger'),
    Database = require('../mongo/connect').Db,
    ObjectID = require('mongodb').ObjectID;

var Resource =  function(){};

Resource.prototype.read = function(collection, query, projection, options, callback) {
    Database.getOwlConnection(function (db) {
        var coll = db.collection(collection);
        logger.info("%j", options);
        coll.find(query, options).toArray(
            (err, result) => {
                if (err) {
                    logger.error("DTA | data/mongo/%s.get %j message: %j", collection, query, err.errmsg);
                    callback(err, null);
                } else {
                    logger.info("DTA | data/mongo/%s.get query: %j records: %j ", collection, query, result);
                    callback(null, result);
                }
            }
        );
    });
};

Resource.prototype.create = function(collection, representation, callback) {
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        coll.insert(representation,
            (err, insert) => {
                if (err) {
                    logger.error("DTA | data/mongo/%s.insert %j", collection, err.errmsg);
                    callback(err, null);
                } else {
                    logger.info("DTA | data/mongo/%s.insert %j ", collection, insert);
                    callback(null, insert);
                }
            }
        );
    });
};


Resource.prototype.delete = function(collection, id, callback) {
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        var query = {_id: new ObjectID(id)};        
        coll.remove(query, (err, remove) => {
            if (err) {
                logger.error("DTA | data/mongo/%s.remove %j", collection, err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA | data/mongo/%s.remove %j ", collection, remove);
                callback(null, remove);
            }
        });
    });
};

Resource.prototype.update = function(collection, id, modifier, callback) {
    
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        var query = {_id: new ObjectID(id)};
        var set = { $set: modifier };
        logger.info("DTA | data/mongo/%s.update %j", collection, set);
        
        coll.update(query, set, (err, update) => {
            if (err) {
                logger.error("DTA | data/mongo/%s.update %j", collection, err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA | data/mongo/%s.update %j ", collection, update);
                callback(null, update);
            }
        });
    });
};

exports.Resource = new Resource();
