var Resource = require('../data/mongo/resource').Resource,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var BL_Groups =  function(){};
const collection = 'groups';

BL_Groups.prototype.read = function(options, callback){
    logger.info("BSN | business/%s.getAll request", collection);
    var children = [];
    var query = {};
    var projection = {};

    logger.info("%j", options);
    

    Resource.read(collection, query, projection, options, (err, data) => {
        logger.info("BSN | business/%s.getAll receive %d records", collection, data.length);    
        if(!err){
            for(var i = 0; i< data.length; i++){
                var group = data[i];
                var node = {
                    id : group._id,
                    text: group.alias,
                    glyph: 'xf0c0@FontAwesome',
                    leaf : false
                };
                var leaf = [
                    {
                        id : group._id,
                        text: 'bar',
                        glyph: 'xf0c0@FontAwesome',
                        leaf : true
                    }
                ];
                node.children = leaf;
                children.push(node);
            }
            logger.info("BSN | result %j", children);
            callback(err, children);
        } else {
            callback(err, null);
        }
    })
};

BL_Groups.prototype.readOne = function(id, callback){
    var query = {_id: new ObjectID(id)};        

    Resource.read(collection, query, function (err, data) {
        logger.info("BSN | business/%s.get [%s] receive %j records", collection, id, data);   
        callback(err, data);
    });        
};

BL_Groups.prototype.create = function(object, issuer, callback){
    object.created = { date: new Date(), issuer: issuer};
    
    Resource.create(collection, object, function (err, insert) {
        logger.info("BSN | business/%s.insert %j ", collection, insert);   
        callback(err, insert);
    });        
};

BL_Groups.prototype.delete = function(id, callback){
    Resource.delete(collection, id, function (err, remove) {
        logger.info("BSN | business/%s.remove %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

BL_Groups.prototype.update = function(id, object, issuer, callback){
    object.updated = { date: new Date(), issuer: issuer};


    Resource.update(collection, id, object, function (err, remove) {
        logger.info("BSN | business/%s.update %s %j ", collection, id, remove);   
        callback(err, remove);
    });        
};

exports.BL_Groups = new BL_Groups();