let Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utility/logger'),
    _ = require('underscore'),
    async = require('async'),
    bcrypt = require('bcrypt'),
    ObjectID = require('mongodb').ObjectID,
    BL_Groups = require('./groups').BL_Groups;
    
const saltRounds = 10;
const myPlaintextPassword = '1234';
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
    logger.info("BSN [%s] business/%s.readOne request", req.sessionID, collection);
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

BL_Users.prototype.fill = function(req, id, callback){
    logger.info("BSN [%s] business/%s.fill [%s] request", req.sessionID, collection, id);
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
            object.created = { 
                date: new Date(), 
                issuer : (req !== undefined && req.session !== undefined && req.session.user !== undefined && req.session.user.username) ? req.session.user.username : undefined
            };

            // an user always has a group.
            // after insertion the user must be part of that group.
            var groupId = object.group; // hold the group id
            object = _.omit(object, ['_id']); // omiting the group indication...

            Resource.create(req.sessionID, collection, object, (err, insert) => {
                logger.info("BSN [%s] business/%s.insert %j ", req.sessionID, collection, insert.result);
                //that's means the user was inserted as expected...
                if(insert.result.n === 1){
                    //now we must add the user into the group...
                    BL_Groups.readOne(req, groupId, function(err, group){
                        group = _.omit(group, ['_id']);
                        var userId = insert.insertedIds[0];
                        BL_Groups.pushUser(req, groupId, userId, function(err, update){
                            if(!err) insert.result.id = userId;
                            callback(err, insert.result);
                        });
                    });
                } else {
                    callback(null, null);
                }
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
    object = _.omit(object, ['_id']);
    Resource.update(req.sessionID, collection, id, object, (err, remove) => {
        logger.info("BSN [%s] business/%s.remove %s %j ", req.sessionID, collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Users.prototype.auth = (sessionID, username, password, callback) =>{
    var query = {username: username};
    read(sessionID, query, (err, data) => {
        if(!err && data != undefined && data.length > 0){
            var user = _.first(data);
            logger.info("BSN [%s] business/%s.auth %s %j", sessionID, collection, user.username, user);   
            bcrypt.compare(password, user.password, (err, res) => {
                if(res == true) {
                    logger.info('BSN [%s] the user [%s] was atuthenticated', sessionID, user.username);
                    callback(err, _.omit(user, ['password']));
                }
                else {
                    callback(null, null);          
                    logger.info('BSN [%s] the user [%s] was not atuthenticated' , sessionID, user.username);
                }
            });
        } else {
            callback(null, null);
        }
    });
};



function read(sessionID, query, callback){
    Resource.read(sessionID, collection, query, {}, {}, (err, data) => {
        logger.info("BSN [%s] business/%s.getAll receive %d records", sessionID, collection, data.length);    
        callback(err, data);
    })
}

exports.BL_Users = new BL_Users();