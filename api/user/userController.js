const mongoose = require('mongoose');
const User = require('./userModel');
const jwt = require('jsonwebtoken');
const searchHelper = require('../../helper/searchHelper');

exports.authenticate = function(req, res){
    User.findOne({name: req.body.name}, function(err, user){
        if(err){
            res.status(500).json({ 
                success: false,
                error: err 
            });
        } else{
            if(user){
                if(req.body.password === user.password){
                    const token = jwt.sign({
                        _id:user._id,
                        name: user['name'],
                        isAdmin:user['isAdmin']
                    }, process.env.JWT_KEY);

                    return res.status(200).json({
                        success:true,
                        token: token
                    });
                } else{
                    res.status(401).json({
                        success:false,
                        error: "Invalid credentials"
                    });
                }
            }
            res.status(401).json({
                success:false,
                error: "Invalid credentials"
            });
        }
    });
};

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

    User.find(searchParams)
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                users: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        });
};

exports.findAll = function(req, res){
    User.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                users: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        });
};

exports.insert = function(req, res){
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        currentPoints: req.body.currentPoints,
        totalPoints: req.body.totalPoints
    });  
    user.save()
        .then(result => {
            res.status(201).send({
                success: true,
                user: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        });  
}

exports.find = function(req, res){
    User.findById(req.params.userId)
        .exec()
        .then(result => {
            if(doc){
                res.status(201).send({
                    success: true,
                    user: result
                });
            } else{
                res.status(404).send({
                    success: false,
                    error: "No results"
                });
            }            
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        })
}

exports.delete = function(req, res){
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        })
}

exports.update = function(req, res){
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            });
        })
        .catch(err =>{
            res.status(500).json({ 
                success: false,
                error: err 
            });
        })
};

var exports = module.exports;