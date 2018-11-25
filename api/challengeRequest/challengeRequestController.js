const searchHelper = require('../../helper/searchHelper');
const dataService = require('./challengeRequestDataService');

exports.filter = function(req, res){
    var searchParams;
    try{        
        searchParams = searchHelper.buildParams(req.body);
    } catch {
        res.status(500).json({ 
            success: false,
            error: err 
        });
    }

    var populate = false;
    if(req.query.populate){
        populate = req.query.populate;
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
                    challengeRequests: result.challengeRequests
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
    var populate = false;
    if(req.query.populate){
        populate = req.query.populate;
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
                    challengeRequests: result.challengeRequests
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
    const challengeRequest = {
        date: req.body.date,
        isAccepted: req.body.isAccepted,
        motivation: req.body.motivation,
        user_id: req.body.user_id,
        challenge_id: req.body.challenge_id,
    };  

    dataService.insert(challengeRequest)
        .then(result => {           
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    challengeRequest: result.challengeRequest
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
}

exports.find = function(req, res){
    var populate;
    if(req.query.populate){
        populate = req.query.populate;
    } else{
        populate = false;
    }
    dataService.find(req.params.challengeRequestId, populate)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    challengeRequest: result.challengeRequest
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
}

exports.delete = function(req, res){
    dataService.delete(req.params.challengeRequestId)
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
}

exports.update = function(req, res){
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    dataService.update(req.params.challengeRequestId, updateOps)
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