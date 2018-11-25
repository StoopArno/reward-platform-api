const searchHelper = require('../../helper/searchHelper');
const dataService = require('./rewardClaimDataService');

exports.filter = function(req, res){
    var searchParams;
    try{        
        searchParams = searchHelper.buildParams(req.body);
    } catch {
        res.status(500).json({ 
            success: false,
            error: err || "Unknown server error"
        });
    }

    var populate;
    if(req.query.populate){
        populate = req.query.populate;
    } else{
        populate = false;
    }

    var sort = false;
    if(req.query.sort){
        sort = req.query.sort;
    }

    dataService.filter(searchParams, populate, sort)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    rewardClaims: result.rewardClaims
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error || "Unknown server error"
            });
        })
};

exports.findAll = function(req, res){
    var populate;
    if(req.query.populate){
        populate = req.query.populate;
    } else{
        populate = false;
    }

    var sort = false;
    if(req.query.sort){
        sort = req.query.sort;
    }
    
    dataService.findAll(populate, sort)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    rewardClaims: result.rewardClaims
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error ||"Unknown server error"
            });
        })
};

exports.insert = function(req, res){
    const rewardClaim = {
        date: req.body.date,
        received: req.body.received,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id
    };    

    dataService.insert(rewardClaim)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    rewardClaim: result.rewardClaim
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error ||"Unknown server error"
            });
        })
};

exports.find = function(req, res){
    var populate;
    if(req.query.populate){
        populate = req.query.populate;
    } else{
        populate = false;
    }
    dataService.find(req.params.rewardClaimId, populate)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    rewardClaim: result.rewardClaim
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error ||"Unknown server error"
            });
        })
};

exports.delete = function(req, res){
    dataService.delete(req.params.rewardClaimId)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    result: result.result
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error ||"Unknown server error"
            });
        })
};

exports.update = function(req, res){
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    dataService.update(req.params.rewardClaimId, updateOps)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    result: result.result
                });
            } else{
                throw err;
            }        
        }).catch(err => {
            res.status(err.status || 500).json({
                success: false,
                error: err.error ||"Unknown server error"
            });
        })
};

var exports = module.exports;