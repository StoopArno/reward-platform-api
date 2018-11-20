const mongoose = require('mongoose');
const Reward = require('./rewardModel')

exports.findAll = function(req, res){
    Reward.find()
    .exec()
    .then(result => {
        res.status(200).json({
            success: true,
            rewards: result
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
    const reward = new Reward({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        points: req.body.points,
        limit: req.body.limit,
        isAvailable: req.body.isAvailable
    });    
    reward.save()
        .then(result => {
            res.status(201).send({
                success: true,
                reward: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        });   
};

exports.find = function(req, res){
    Reward.findById(req.params.rewardId)
        .exec()
        .then(result => {
            if(result){
                res.status(201).send({
                    success: true,
                    reward: result
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
};

exports.delete = function(req, res){
    Reward.deleteOne({_id: req.params.rewardId})
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
};

exports.update = function(req, res){
    const id = req.params.rewardId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Reward.update({ _id: id}, { $set: updateOps})
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