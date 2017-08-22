/**
 * All operations over mongodb account collection are handled here.
 */

var logger = require('../../../lib/utillity/logger'),
    Connect = require('../mongo/connect').Connect;

var Profiles =  function(){};

Profiles.prototype.getAll = function(callback) {
    logger.info("DTA | profiles [getAll]");

    Connect.toOwl(function (db) {
        var collection = db.collection("profiles");
        collection.find({}).toArray(function (err, result) {
            if (err) {
                logger.error("DTA | profiles [getAll] error to retrieving records | %j", err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA | profiles [getAll] retrieve: %d records", result.length);
                callback(null, result);
            }
        });
    });
};

exports.Profiles = new Profiles();
