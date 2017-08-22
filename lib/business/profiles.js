var db = require('../data/mongo/profiles').Profiles,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore');

var Profiles =  function(){};

Profiles.prototype.getAll = function(callback){
    logger.info("BSN | groups [getAll]");
    db.getAll(function (err, data) {
        callback(err, data);
    })
};

exports.Profiles = new Profiles();