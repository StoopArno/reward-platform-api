const mongoose = require('mongoose');
const RewardClaim = require('./rewardClaimModel');
const searchHelper = require('../../helper/searchHelper');

exports.filter = function(searchParams, populate){
    return new Promise((resolve, reject) => {
        const promise = RewardClaim.find(searchParams);
        searchHelper.populateTables2(populate, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    rewardClaims: result
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

exports.findAll = function(populate){
    return new Promise((resolve, reject) => {        
        const promise = RewardClaim.find();

        searchHelper.populateTables2(populate, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    rewardClaims: result
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

exports.insert = function(rewardClaimObj){
    return new Promise((resolve, reject) => {
        const rewardClaim = new RewardClaim({
            _id: new mongoose.Types.ObjectId(),
            date: rewardClaimObj.date,
            received: rewardClaimObj.received,
            user: rewardClaimObj.user_id,
            reward: rewardClaimObj.reward_id
        }); 

        rewardClaim.save()
            .then(result => {
                resolve({
                    success: true,
                    status: 201,
                    rewardClaim: result
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

exports.find = function(rewardClaim_id, populate){
    return new Promise((resolve, reject) => {
        
        const promise = RewardClaim.findById(rewardClaim_id);
        searchHelper.populateTables2(populate, promise);
        promise.exec()
            .then(result => {                
                if(result){                    
                    resolve({
                        success: true,
                        status: 200,
                        rewardClaim: result
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

exports.delete = function(rewardClaim_id){
    return new Promise((resolve, reject) => {
        RewardClaim.deleteOne({_id: rewardClaim_id})
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

exports.update = function(rewardClaim_id, updateOps){
    return new Promise((resolve, reject) => {
        RewardClaim.update({ _id: rewardClaim_id}, { $set: updateOps})
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