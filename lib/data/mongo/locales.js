/**
 * All operations over mongodb account collection are handled here.
 */

var logger = require('../../../lib/utillity/logger'),
    Connect = require('../mongo/connect').Connect;

var Locales =  function(){};

Locales.prototype.getAll = function(callback) {
    logger.info("DTA | Locales [getAll]");

    Connect.toOwl(function (db) {
        var collection = db.collection("locales");
        collection.find({}).toArray(function (err, result) {
            if (err) {
                logger.error("DTA | locales [getAll] error to retrieving records | %j", err.errmsg);
                callback(err, null);
            } else {
                logger.info("DTA | locales [getAll] retrieve: %d records", result.length);
                callback(null, result);
            }
        });
    });
};

exports.Locales = new Locales();
