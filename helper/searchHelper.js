exports.buildParams = function(reqBody) {
    const searchParams = {};
    for (const params of reqBody){
        if(params.adv){
            if(params.adv === "like"){
                var re = new RegExp(params.value, "i");
                searchParams[params.propName] = re;
            } else{
                switch (params.adv){
                    case "gt":
                        searchParams[params.propName] = { $gt: params.value };
                        break;
                    case "lt":
                        searchParams[params.propName] = { $lt: params.value };
                        break;
                    case "gte":
                        searchParams[params.propName] = { $gte: params.value };
                        break;
                    case "lte":
                        searchParams[params.propName] = { $lte: params.value };
                        break;
                    default:
                        throw err;
                }
            }
        } else{
            searchParams[params.propName] = params.value;
        }
    }
    return searchParams;
};

exports.populateTables = function(req, promise) {
    var populateTables;
    
    if(req.query.populate){
        populateTables = req.query.populate.split(',');
        for(const table of populateTables){
            promise.populate(table);
        }
    }
    return promise;
}


exports.populateTables2 = function(populate, promise) {
    var populateTables;
    if(populate != false){
        populateTables = populate.split(',');
        for(const table of populateTables){
            promise.populate(table);
        }
    }
    return promise;
}

var exports = module.exports;