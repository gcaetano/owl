/**
 * All operations over mongodb collection are handled here.
 */

var logger = require('../../../lib/utillity/logger'),
    Database = require('../mongo/connect').Db,
    ObjectID = require('mongodb').ObjectID;

var Resource =  function(){};

Resource.prototype.read = function(sessionID, collection, query, projection, options, callback) {
    Database.getOwlConnection(function (db) {
        var coll = db.collection(collection);
        coll.find(query, projection, options).toArray(
            (err, result) => {
                if (err) {
                    logger.error("DTA [%s] data/mongo/%s.get message: %j", sessionID, collection, err.errmsg);
                    callback(err, null);
                } else {
                    logger.info("DTA [%s] data/mongo/%s.get records: %j ", sessionID, collection, result.length);
                    callback(null, result);
                }
            }
        );
    });
};

Resource.prototype.create = function(sessionID, collection, representation, callback) {
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        coll.insert(representation,
            (err, insert) => {
                if (err) {
                    logger.error("DTA [%s] data/mongo/%s.insert %j", sessionID, collection, err.errmsg);
                    callback(err, null);
                } else {
                    logger.info("DTA [%s] data/mongo/%s.insert %j ", sessionID, collection, insert);
                    callback(null, insert);
                }
            }
        );
    });
};


Resource.prototype.delete = function(sessionID, collection, id, callback) {
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        var query = {_id: new ObjectID(id)};        
        coll.remove(query, (err, remove) => {
            if (err) {
                logger.error("DTA [%s] data/mongo/%s.remove %j", sessionID, collection, err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA [%s] data/mongo/%s.remove %j ", sessionID, collection, remove);
                callback(null, remove);
            }
        });
    });
};

Resource.prototype.update = function(sessionID, collection, id, modifier, callback) {
    
    Database.getOwlConnection((db) => {
        var coll = db.collection(collection);
        var query = {_id: new ObjectID(id)};
        var set = { $set: modifier };
        logger.info("DTA [%s] data/mongo/%s.update %j", sessionID, collection, set);
        
        coll.update(query, set, (err, update) => {
            if (err) {
                logger.error("DTA [%s] data/mongo/%s.update %j", sessionID, collection, err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA [%s] data/mongo/%s.update %j ", sessionID, collection, update);
                callback(null, update);
            }
        });
    });
};

exports.Resource = new Resource();
