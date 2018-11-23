const mongoose = require('mongoose');
const AchievementType = require('./achievementTypeModel');
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

    const promise = AchievementType.find(searchParams);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                achievementsTypes: result
            });
        })
        .catch(err => {
            res.status(500).json({ 
                success: false,
                error: err 
            });
        });
}

exports.findAll = function(req, res){
    const promise = AchievementType.find();
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            res.status(200).json({
                success: true,
                achievementTypes: result
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
    const achievementType = new AchievementType({
        _id: new mongoose.Types.ObjectId(),
        challenge: req.body.challenge_id,
        reward: req.body.reward_id
    });    
    achievementType.save()
        .then(result => {
            res.status(201).send({
                success: true,
                achievementType: result
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
    const promise = Achievement.findById(req.params.achievementTypeId);
    searchHelper.populateTables(req, promise);
    promise.exec()
        .then(result => {
            if(result){
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
};

exports.delete = function(req, res){
    AchievementType.deleteOne({_id: req.params.achievementTypeId})
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
    const id = req.params.achievementTypeId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    AchievementType.update({ _id: id}, { $set: updateOps})
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