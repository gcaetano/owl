let Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore'),
    bcrypt = require('bcrypt'),
    ObjectID = require('mongodb').ObjectID;
    
const saltRounds = 10;
const myPlaintextPassword = 'asdf';
const collection = 'users';

let BL_Users =  function(){};

BL_Users.prototype.read = function(req, options, callback){
    logger.info("BSN [%s] business/%s.getAll request", req.sessionID, collection);
    var children = [];
    var query = {};
    var projection = {};
    logger.info("BSN [%s] query: %j, projection %j, options: %j", req.sessionID, query, projection, options);
    
    Resource.read(req.sessionID, collection, query, projection, options, (err, data) => {
        callback(err, data);        
    });
};

BL_Users.prototype.readOne = function(req, id, callback){
    let query = {_id: new ObjectID(id)};    
    read(read.sessionID, query, (err, data) => {
        if(!err){
            let user = _.first(data);            
            callback(err, _.omit(user, ['password']));
        } else {
            callback(err, null);
        }
    });
};

BL_Users.prototype.create = function(req, object, callback){
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
            object.password = hash;
            object.created = { date: new Date(), issuer: req.session.user.username};
        
            Resource.create(req.sessionID, collection, object, (err, insert) => {
                logger.info("BSN [%s] business/%s.insert %j ", req.sessionID, collection, insert);   
                callback(err, insert.result);
            });
        });
    });        
};

BL_Users.prototype.delete = function(req, id, callback){
    Resource.delete(req.sessionID, collection, id, (err, remove)  => {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Users.prototype.update = function(req, id, object, callback){
    object.updated = { date: new Date(), issuer: req.session.user};

    Resource.update(sessionID, collection, id, object, (err, remove) => {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Users.prototype.auth = (sessionID, username, password, callback) =>{
    var query = {username: username};
    logger.info("BSN [%j]", query);    
    read(sessionID, query, (err, data) => {
        if(!err && data != undefined && data.length > 0){
            var user = _.first(data);
            logger.info("BSN [%s] business/%s.auth %s %j", sessionID, collection, user.username, user);   
            bcrypt.compare(password, user.password, (err, res) => {
                callback(err, _.omit(user, ['password']));
            });
        } else {
            callback(null, null);
        }
    });
};



function read(sessionID, query, callback){
    logger.info("BSN [%j]", query);
    Resource.read(sessionID, collection, query, {}, {}, (err, data) => {
        logger.info("BSN [%s] business/%s.getAll receive %d records", sessionID, collection, data.length);    
        callback(err, data);
    })
}

exports.BL_Users = new BL_Users();