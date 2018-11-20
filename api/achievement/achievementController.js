const mongoose = require('mongoose');
const Achievement = require('./achievementModel')

exports.findAll = function(req, res){
    Achievement.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                achievements: result
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
    const achievement = new Achievement({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        isAvailable: req.body.isAvailable,
        achievementType: req.body.achievementType_id
    });    
    achievement.save()
        .then(result => {
            res.status(201).send({
                success: true,
                achievement: result
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
    Achievement.findById(req.params.achievementId)
        .exec()
        .then(result => {
            if(result){
                res.status(201).send({
                    success: true,
                    achievement: result
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
    Achievement.deleteOne({_id: req.params.achievementId})
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
    const id = req.params.achievementId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Achievement.update({ _id: id}, { $set: updateOps})
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