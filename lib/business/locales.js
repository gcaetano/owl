var CRUD = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore');

var Locales =  function(){};
var collection = 'locales';

Locales.prototype.getAll = function(callback){
    // logger.info("BSN | groups [getAll]");
    // CRUD.getAll(collection, function (err, data) {
    //     callback(err, data);
    // })
};

exports.Locales = new Locales();