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

var exports = module.exports;