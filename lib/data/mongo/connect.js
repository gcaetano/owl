var owl_db = require('../mongo/hosts/owl');
var owlDb;

var Db =  function(){};

Db.prototype.openOwlConnection = function(callback){
    owl_db(function (db) {
        owlDb = db;
        callback(owlDb);
    });
};

Db.prototype.getOwlConnection = function(callback){
    if(owlDb)
        callback(owlDb);
    else
        owl_db(function (db) {
            owlDb = db;
            callback(owlDb);
        });
};

exports.Db = new Db();