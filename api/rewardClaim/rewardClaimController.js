const mongoose = require('mongoose');
const RewardClaim = require('./rewardClaimModel')
const searchHelper = require('../../helper/searchHelper');

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

    const promise = RewardClaim.find(searchParams);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                rewardClaims: result
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
    const promise = RewardClaim.find();
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                rewardClaims: result
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
    const rewardClaim = new RewardClaim({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        received: req.body.received,
        user: req.body.user_id,
        reward: req.body.reward_id
    });    
    rewardClaim.save()
        .then(result => {
            res.status(201).send({
                success: true,
                rewardClaim: result
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
    const promise = RewardClaim.findById(req.params.rewardClaimId);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            if(result){
                res.status(201).send({
                    success: true,
                    rewardClaim: result
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
    RewardClaim.deleteOne({_id: req.params.rewardClaimId})
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
    const id = req.params.rewardClaimId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    RewardClaim.update({ _id: id}, { $set: updateOps})
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