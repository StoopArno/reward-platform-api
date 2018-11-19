const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Challenge = require('../models/challenge');

router.get('/',  (req, res, next) => {
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
});

router.post('/',  (req, res, next) => {
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
});

router.get('/:challengeId',  (req, res, next) => {
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
});

router.delete('/:challengeId',  (req, res, next) => {
    Challenge.deleteOne({_id: req.params.challengeId})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

router.patch('/:challengeId',  (req, res, next) => {
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
});

module.exports = router;