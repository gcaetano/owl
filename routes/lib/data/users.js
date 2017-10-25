/**
 * Created by Giuliano Ferreira Caetano on 23/05/2016.
 * class to wrap all data action.
 */
var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    Tedious = require('tedious').Request,
    TYPES = require('tedious').TYPES,
    config = require('../../../lib/utility/settings');

var Data =  function(){};

Data.prototype.getAll = function(callback){
    var db = new Db('back_office', new Server('localhost', 27017));
    // Establish connection to db
    db.open(function(err, db) {
        db.collection('users', function (err, collection) {
            // Retrieve all the documents in the collection
            collection.find().toArray(function (err, documents) {
                if(err) callback([]);
                callback(documents);
                db.close();
            });
        });
    });
};

Data.prototype.get = function(id, callback){
    var db = new Db('back_office', new Server('localhost', 27017));
    // Establish connection to db
    db.open(function(err, db) {
        db.collection('users', function (err, collection) {
            // Retrieve all the documents in the collection
            var query = {user_id: id};
            collection.find(query).toArray(function (err, documents) {
                if(err) callback([]);
                callback(documents);
                db.close();
            });
        });
    });
};

Data.prototype.save = function(user, callback) {
    var db = new Db('back_office', new Server('localhost', 27017));
    // Establish connection to db
    db.open(function (err, db) {
        db.collection('users', function (err, collection) {
            collection.save(user, function (err, inserts) {
                if (err) callback(err, []);
                callback(null, inserts);
                db.close();
            });
        });
    });
};

Data.prototype.auth = function(username, password, callback) {
    var Connection = require('tedious').Connection;

    var config = {
        userName: 'datatronics',
        password: 'datatronics',
        server: '10.0.0.12',
        options: {
            database: 'conexa_europa_q108',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        }
    };

    var connection = new Connection(config);

    connection.on('connect', function(err) {
            // If no error, then good to go...
            var request = new Tedious("[auth].[usp_checkAuthentication]", function(err, rowCount) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }// else {
                    //console.log(rowCount + ' rows');
                //}
            });
            request.addParameter('login', TYPES.VarChar, username);
            request.addParameter('password', TYPES.VarChar, password);
            request.on('row', function(columns) {
                var result = {};
                for(var i = 0; i < columns.length ; i++){
                    result[columns[i].metadata.colName] = columns[i].value;
                }
                callback(null, result);
            });

            connection.callProcedure(request);
        }
    );
};

Data.prototype.getMobiles = function(userId, groupId, callback) {
    var Connection = require('tedious').Connection;

    var config = {
        userName: 'datatronics',
        password: 'datatronics',
        server: '10.0.0.12',
        options: {
            database: 'conexa_europa_q108',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        }
    };

    var connection = new Connection(config);

    connection.on('connect', function(err) {
            // If no error, then good to go...
            var result = [];

            var request = new Tedious("[zgl].[usp_getVehiclesPerUserAndGroup]", function(err, rowCount) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
            });
            request.addParameter('id_user', TYPES.Int, userId);
            request.addParameter('id_group', TYPES.Int, groupId);
            request.on('doneInProc', function (rowCount, more, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = {};
                    for (var j = 0; j < rows[i].length ; j++){
                        row[rows[i][j].metadata.colName] = rows[i][j].value;
                    }
                    result.push(row);
                }
                callback(null, result);
            });

            connection.callProcedure(request);
        }
    );
};

Data.prototype.getDrivers = function(userId, groupId, callback) {
    var Connection = require('tedious').Connection;

    var config = {
        userName: 'datatronics',
        password: 'datatronics',
        server: '10.0.0.12',
        options: {
            database: 'conexa_europa_q108',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        }
    };

    var connection = new Connection(config);
    var result = [];
    connection.on('connect', function(err) {
            // If no error, then good to go...
            var request = new Tedious(
                "SELECT TOP 100 PERCENT " +
                "d.[uid], " +
                "d.[gid], " +
                "d.[dr_code], " +
                "d.[issuing_authority], " +
                "d.[issuing_state], " +
                "d.[issue_date], " +
                "d.[card_validation_date_begin], " +
                "d.[card_validation_date_end], " +
                "d.[ibutton], " +
                "d.[internal_number], " +
                "d.[name], " +
                "d.[tag], " +
                "d.[activity_date_begin], " +
                "d.[activity_date_end], " +
                "d.[phone_personal], " +
                "d.[phone_company], " +
                "d.[email], " +
                "(CASE WHEN sgr.id IS NOT NULL THEN 0 ELSE 1 END) as [is_subgroup_permission] " +
                "FROM auth.udf_getDrivers(" + userId +") d " +
                "INNER JOIN auth.struct_user u ON u.id = " + userId + " " +
                "INNER JOIN auth.struct_group_permission gp ON gp.id_group = "+ groupId +" AND d.[uid] = gp.id_permission " +
                "LEFT OUTER JOIN auth.struct_sub_group_restriction sgr ON sgr.id_sub_group = u.id_sub_group AND gp.id = sgr.id_group_permission " +
                "ORDER BY d.[name], d.[dr_code] ASC " , function(err, rowCount) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    }
                });

            request.on('doneInProc', function (rowCount, more, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = {};
                    for (var j = 0; j < rows[i].length ; j++){
                        row[rows[i][j].metadata.colName] = rows[i][j].value;
                    }
                    result.push(row);
                }
                callback(null, result);
            });

            connection.execSql(request);
        }
    );
};

module.exports = new Data();