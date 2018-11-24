const searchHelper = require('../../helper/searchHelper');
const dataService = require('./rewardDataService');

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
    dataService.filter(searchParams)
        .then(result => {            
            if(result.success === true){     
                res.status(result.status).json({
                    success: true,
                    rewards: result.rewards
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
    dataService.findAll()
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    rewards: result.rewards
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
    const reward = {
        title: req.body.title,
        points: req.body.points,
        limit: req.body.limit,
        isAvailable: req.body.isAvailable
    };   

    dataService.insert(reward)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    reward: result.reward
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
    dataService.find(req.params.rewardId)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    reward: result.reward
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
    dataService.delete(req.params.rewardId)
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

    dataService.update(req.params.rewardId, updateOps)
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