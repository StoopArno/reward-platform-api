const mongoose = require('mongoose');
const Challenge = require('./challengeModel');

exports.findAll = function(req, res){
    Challenge.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                challenges: result
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
    console.log(req.body.user);
    const challenge = new Challenge({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        points: req.body.points,
        limit: req.body.limit,
        isAvailable: req.body.isAvailable
    });  
    challenge.save()
        .then(result => {
            res.status(201).send({
                success: true,
                challenge: result
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
    Challenge.findById(req.params.challengeId)
        .exec()
        .then(doc => {
            if(result){
                res.status(201).send({
                    success: true,
                    challenge: result
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
    Challenge.deleteOne({_id: req.params.challengeId})
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
    const id = req.params.challengeId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Challenge.update({ _id: id}, { $set: updateOps})
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