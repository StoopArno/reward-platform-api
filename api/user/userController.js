const searchHelper = require('../../helper/searchHelper');
const dataService = require('./userDataService');

exports.authenticate = function(req, res){
    dataService.authenticate(req.body.name, req.body.password)
        .then(result => {
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    token: result.token
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
                    users: result.users
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
                    users: result.users
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
    const user = {
        name: req.body.name,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        currentPoints: req.body.currentPoints,
        totalPoints: req.body.totalPoints
    };  

    dataService.insert(user)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    user: result.user
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
    dataService.find(req.params.userId)
        .then(result => {            
            if(result.success === true){        
                res.status(result.status).json({
                    success: true,
                    user: result.user
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
    dataService.delete(req.params.userId)
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

    dataService.update(req.params.userId, updateOps)
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