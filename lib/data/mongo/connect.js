
var owl_db = require('../mongo/connections/owl');
var owlDb;

var Connect =  function(){};

Connect.prototype.toOwl = function(callback){
    owl_db(function (db) {
        owlDb = db;
        callback(owlDb);
    });
};


exports.Connect = new Connect();