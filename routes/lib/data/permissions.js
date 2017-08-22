/**
 * Created by Giuliano Ferreira Caetano on 23/05/2016.
 * wrapper class to package all data action.
 */
var Db = require('mongodb').Db,
    Server = require('mongodb').Server;

var Data =  function(){};

Data.prototype.getAll = function(callback){
    var db = new Db('strava', new Server('10.0.0.122', 27017));
    // Establish connection to db
    db.open(function(err, db) {
        db.collection('permissions', function (err, collection) {
            // Retrieve all the documents in the collection
            collection.find().toArray(function (err, documents) {
                if(err) callback([]);
                var result = [];
                for (var i = 0; i < documents.length; i++){
                    result.push({
                        id: documents[i]._id,
                        name :documents[i].alias
                    });
                }
                callback(result);
                db.close();
            });
        });
    });
};

Data.prototype.getUserPermissions = function(id_user, callback){
    var db = new Db('strava', new Server('10.0.0.122', 27017));

    // Establish connection to db
    db.open(function(err, db) {
        db.collection('permissions', function (err, collection) {
            var query = {id_user: id_user};
            collection.find(query).toArray(function (err, documents) {
                if(err) callback(err, null);
                callback(null, documents);
                db.close();
            });
        });
    });
};



module.exports = new Data();