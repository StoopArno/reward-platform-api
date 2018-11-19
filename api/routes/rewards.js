const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reward = require('../models/reward')

router.get('/',  (req, res, next) => {
    Reward.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch()

});

router.post('/',  (req, res, next) => {
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
                reward: reward
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
    
});

router.get('/:rewardId',  (req, res, next) => {
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
    });

router.delete('/:rewardId',  (req, res, next) => {
    res.status(200).json({
        msg : 'Deleted reward!',
        id : req.params.rewardId
    });
});

router.patch('/:rewardId',  (req, res, next) => {
    res.status(200).json({
        msg : 'Updated reward',        
        id : req.params.rewardId
    });
});


module.exports = router;