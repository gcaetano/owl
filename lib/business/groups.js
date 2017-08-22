var db = require('../data/mongo/groups').Groups,
    logger = require('../../lib/utillity/logger'),
    _ = require('underscore');

var Groups =  function(){};

Groups.prototype.getAll = function(callback){
    logger.info("BSN | groups [getAll]");
    var children = [];
    db.getAll(function (err, data) {
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
            logger.info("BSN | " + JSON.stringify(children));
            callback(err, children);
        } else {
            callback(err, null);
        }
    })
};

exports.Groups = new Groups();