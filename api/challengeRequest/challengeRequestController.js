const mongoose = require('mongoose');
const ChallengeRequest = require('./challengeRequestModel');

exports.findAll = function(req, res){
    ChallengeRequest.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.insert = function(req, res){
    console.log(req.body.user);
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
                msg: 'Created challengeRequest',
                challengeRequest: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });  
}

exports.find = function(req, res){
    ChallengeRequest.findById(req.params.challengeRequestId)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({error: "No entry found for given ID"});
            }            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}

exports.delete = function(req, res){
    ChallengeRequest.deleteOne({_id: req.params.challengeRequestId})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
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
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err});
        })
};

var exports = module.exports;