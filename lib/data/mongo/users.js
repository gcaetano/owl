
var logger = require('../../../lib/utillity/logger'),
    Connect = require('../mongo/connect').Connect;

var Users =  function(){};


/*
 Create for CRUD operation
 */
Users.prototype.create = function(user, callback){
    logger.info("not implemented yet!");
    logger.info(JSON.stringify(user));
};

Users.prototype.get = function(ids, callback){
    logger.info("not implemented yet!");
};

Users.prototype.update = function(user, callback){
    logger.info("not implemented yet!");
};

Users.prototype.remove = function(id, callback){
    logger.info("not implemented yet!");
};

exports.Users = new Users();