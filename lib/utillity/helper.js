/**
 * All operations over mongodb collection are handled here.
 */

var logger = require('./logger');

var Helper =  function(){};

Helper.prototype.getReadOptions = function(query) {
    // sort=alias&dir=desc&skip=0&limit=1
    
    var options = {
        "limit": query.limit ? parseInt(query.limit) : undefined,
        "skip": query.skip ? parseInt (query.skip) : undefined,
        "sort": []
    };

    if(query.sort){
        var sort = [query.sort, query.dir || 'asc'];
        options.sort.push(sort);
    }

    return options;
};


exports.Helper = new Helper();
