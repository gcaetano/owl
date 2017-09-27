var db = require('../data/mongo/users').Users,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore');

var Profiles =  function(){};

Profiles.prototype.create = function(user, callback){
    logger.info("BSN | user");
    db.create(user, function (err, data) {
        callback(err, data);
    })
};

exports.Profiles = new Profiles();