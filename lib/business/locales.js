var db = require('../data/mongo/locales').Locales,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore');

var Locales =  function(){};

Locales.prototype.getAll = function(callback){
    logger.info("BSN | groups [getAll]");
    db.getAll(function (err, data) {
        callback(err, data);
    })
};

exports.Locales = new Locales();