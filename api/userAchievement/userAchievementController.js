const mongoose = require('mongoose');
const UserAchievement = require('./userAchievementModel');
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

    const promise = ChallengeRequest.UserAchievement.find(searchParams);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                userAchievement: result
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
    const promise = ChallengeRequest.UserAchievement.find();
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                userAchievements: result
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
    const userAchievement = new UserAchievement({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user_id,
        achievement: req.body.achievement_id,
        date: req.body.date,
    });    
    userAchievement.save()
        .then(result => {
            res.status(201).send({
                success: true,
                userAchievement: result
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
    const promise = findById(req.params.userAchievementId);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            if(result){
                res.status(201).send({
                    success: true,
                    userAchievement: result
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
    UserAchievement.deleteOne({_id: req.params.userAchievementId})
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
    const id = req.params.userAchievementId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    UserAchievement.update({ _id: id}, { $set: updateOps})
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