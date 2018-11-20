const mongoose = require('mongoose');
const Challenge = require('./challengeModel');

exports.findAll = function(req, res){
    Challenge.find()
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
    const challenge = new Challenge({
        _id: new mongoose.Types.ObjectId(),
        points: req.body.points,
        title: req.body.title
    });  
    challenge.save()
        .then(result => {
            res.status(201).send({
                msg: 'Created challenge',
                challenge: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });  
}

exports.find = function(req, res){
    Challenge.findById(req.params.challengeId)
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

exports.destroy = function(req, res){
    Challenge.deleteOne({_id: req.params.challengeId})
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
    const id = req.params.challengeId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Challenge.update({ _id: id}, { $set: updateOps})
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