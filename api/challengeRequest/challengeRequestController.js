const mongoose = require('mongoose');
const ChallengeRequest = require('./challengeRequestModel');

exports.findAll = function(req, res){
    ChallengeRequest.find()
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                challengeRequests: result
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
    const challengeRequest = new ChallengeRequest({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        isAccepted: req.body.isAccepted,
        motivation: req.body.motivation,
        user: req.body.user_id,
        challenge: req.body.challlenge_id,
    });  
    challengeRequest.save()
        .then(result => {
            res.status(201).send({
                success: true,
                challengeRequest: result
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
    ChallengeRequest.findById(req.params.challengeRequestId)
        .exec()
        .then(result => {
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
    ChallengeRequest.deleteOne({_id: req.params.challengeRequestId})
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
    const id = req.params.challengeRequestId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    ChallengeRequest.update({ _id: id}, { $set: updateOps})
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