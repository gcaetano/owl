var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore'),
    bcrypt = require('bcrypt'),
    ObjectID = require('mongodb').ObjectID;
    
const saltRounds = 10;
const myPlaintextPassword = 'P4$$w0rD';
const collection = 'users';

var BL_Users =  function(){};

BL_Users.prototype.read = function(callback){
    var query = {};
    read(query, function(err, data){
        callback(err, data);        
    });
};

BL_Users.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};    
    read(query, function(err, data){
        callback(err, data);        
    });
};

BL_Users.prototype.create = function(object, issuer, callback){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            object.password = hash;
            object.created = { date: new Date(), issuer: issuer};
        
            Resource.create(collection, object, function (err, insert) {
                logger.info("BSN | business/%s.insert %j ", collection, insert);   
                callback(err, insert);
            });
        });
    });        
};

BL_Users.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Users.prototype.update = function(id, object, issuer, callback){
    object.updated = { date: new Date(), issuer: issuer};

    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Users.prototype.auth = function(username, password, callback){
    var query = {username: username};
    read(query, (err, data) => {
        if(!err){
            var user = _.first(data);
            logger.info("BSN | business/%s.auth %s %s %j", collection, user.username, password, user);   
            bcrypt.compare(password, user.password, function(err, res) {
                callback(err, data);
            });
        } else {
            callback(null, null);
        }
    });
};



function read(query, callback){
    Resource.read(collection, {}, function (err, data) {
        logger.info("BSN | business/%s.getAll receive %d records", collection, data.length);    
        callback(err, data);
    })
}

exports.BL_Users = new BL_Users();