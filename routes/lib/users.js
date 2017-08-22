var user = require('../lib/data/users'),
    permissions = require('../lib/data/permissions'),
    _ = require('underscore');

var Data =  function(){};

Data.prototype.makeAuth = function(username, password, callback){
    user.auth(username, password, function(err, data){
        if(err) callback(err, null);
        user.getMobiles(data.user_id, data.group_id, function(err, mobiles){
            if(err) callback(err, null);
            else {
                data['mobiles'] = mobiles;
                data['uid'] = getUniqueIds(mobiles);
                user.getDrivers(data.user_id, data.group_id, function(err, drivers){
                    data['drivers'] = drivers;
                    var models = [];
                    for (var i = 0; i < mobiles.length; i++) {
                        var model = {};
                        if(mobiles[i].model_id !== null){
                            var md = _.findWhere(models, {model_id: mobiles[i].model_id});
                            if (typeof md === 'undefined') {
                                model['model_id'] = mobiles[i].model_id;
                                model['brand_id'] = mobiles[i].brand_id;
                                model['model'] = mobiles[i].model;
                                model['brand'] = mobiles[i].brand;
                                models.push(model);
                            }
                        }
                    }
                    data['models'] = models;
                    user.get(data.user_id, function (docs) {
                        if(docs.length > 0) {
                            var user = _.first(docs);
                            data.backoffice = user.backoffice;
                            callback(null, data);
                        }
                    })
                });
            }
        });
    });
};

function getUniqueIds(mobiles) {
    var uids = [];
    for (var i = 0; i < mobiles.length; i++) {
        var mobile = mobiles[i];
        uids.push(mobile.uid);
    }
    return uids;
}


module.exports = new Data();