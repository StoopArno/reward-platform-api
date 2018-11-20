const mongoose = require('mongoose');
const Achievement = require('./achievementModel')

exports.findAll = function(req, res){
    Achievement.find()
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
    const achievement = new Achievement({
        _id: new mongoose.Types.ObjectId(),
        counter: req.body.counter,
        description: req.body.description,
        title: req.body.title,
        userId: req.body.userId
    });    
    achievement.save()
        .then(result => {
            res.status(201).send({
                msg: 'Created achievement',
                achievement: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });   
};

exports.find = function(req, res){
    Achievement.findById(req.params.achievementId)
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
    Achievement.deleteOne({_id: req.params.achievementId})
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
    const id = req.params.achievementId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Achievement.update({ _id: id}, { $set: updateOps})
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