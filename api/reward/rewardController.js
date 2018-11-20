const mongoose = require('mongoose');
const Reward = require('./rewardModel')

exports.findAll = function(req, res){
    Reward.find()
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
    const reward = new Reward({
        _id: new mongoose.Types.ObjectId(),
        points: req.body.points,
        descriptionShort: req.body.descriptionShort,
        descriptionLong: req.body.descriptionLong
    });    
    reward.save()
        .then(result => {
            res.status(201).send({
                msg: 'Created reward',
                reward: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });   
};

exports.find = function(req, res){
    Reward.findById(req.params.rewardId)
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
};

exports.delete = function(req, res){
    Reward.deleteOne({_id: req.params.rewardId})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
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
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err});
        })
};

var exports = module.exports;