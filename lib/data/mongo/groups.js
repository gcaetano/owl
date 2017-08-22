/**
 * All operations over mongodb account collection are handled here.
 */

var logger = require('../../../lib/utillity/logger'),
    Connect = require('../mongo/connect').Connect;

var Groups =  function(){};

Groups.prototype.getAll = function(callback) {
    logger.info("DTA | groups [getAll]");

    Connect.toOwl(function (db) {
        var collection = db.collection("groups");
        collection.find({}).toArray(function (err, result) {
            if (err) {
                logger.error("DTA | groups [getAll] error to retrieving records | %j", err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA | groups [getAll] retrieve: %d records", result.length);
                callback(null, result);
            }
        });
    });
};

exports.Groups = new Groups();
