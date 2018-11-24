const mongoose = require('mongoose');
const Reward = require('./rewardModel');

exports.filter = function(searchParams){
    return new Promise((resolve, reject) => {
        Reward.find(searchParams).exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    rewards: result
                });
            })
            .catch(err => {
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            });
    });
};

exports.findAll = function(){
    return new Promise((resolve, reject) => {
        Reward.find().exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    rewards: result
                });
            })
            .catch(err => {
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            });
    })
};

exports.insert = function(rewardObj){
    return new Promise((resolve, reject) => {
        const reward = new Reward({
            _id: new mongoose.Types.ObjectId(),
            title: rewardObj.title,
            points: rewardObj.points,
            limit: rewardObj.limit,
            isAvailable: rewardObj.isAvailable
        }); 

        reward.save()
            .then(result => {
                resolve({
                    success: true,
                    status: 201,
                    reward: result
                });
            })
            .catch(err => {
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            });
    })
};

exports.find = function(reward_id){
    return new Promise((resolve, reject) => {
        Reward.findById(reward_id)
            .exec()
            .then(result => {
                if(result){
                    resolve({
                        success: true,
                        status: 200,
                        reward: result
                    });
                } else{
                    reject({
                        success: false,
                        status: 404,
                        error: "No results"
                    });
                }            
            })
            .catch(err => {
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            })
    })
};

exports.delete = function(reward_id){
    return new Promise((resolve, reject) => {
        Reward.deleteOne({_id: reward_id})
            .exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    result: result
                });
            })
            .catch(err => {
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            })
    })
};

exports.update = function(reward_id, updateOps){
    return new Promise((resolve, reject) => {
        Reward.update({ _id: reward_id}, { $set: updateOps})
            .exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    result: result
                });
            })
            .catch(err =>{
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            })
    })
};

var exports = module.exports;