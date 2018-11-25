const mongoose = require('mongoose');
const ChallengeRequest = require('./challengeRequestModel');
const searchHelper = require('../../helper/searchHelper');

exports.filter = function(searchParams, populate, sort){
    return new Promise((resolve, reject) => {
        const promise = ChallengeRequest.find(searchParams);
        searchHelper.populateTables2(populate, promise);
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    challengeRequests: result
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

exports.findAll = function(populate, sort){
    return new Promise((resolve, reject) => {        
        const promise = ChallengeRequest.find();
        searchHelper.populateTables2(populate, promise);
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    challengeRequests: result
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

exports.insert = function(challengeRequestObj){
    return new Promise((resolve, reject) => {
        const challengeRequest = new ChallengeRequest({
            _id: new mongoose.Types.ObjectId(),
            date: challengeRequestObj.date,
            isAccepted: challengeRequestObj.isAccepted,
            motivation: challengeRequestObj.motivation,
            user: challengeRequestObj.user_id,
            challenge: challengeRequestObj.challenge_id,
        }); 

        challengeRequest.save()
            .then(result => {
                resolve({
                    success: true,
                    status: 201,
                    challengeRequest: result
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

exports.find = function(challengeRequest_id, populate){
    return new Promise((resolve, reject) => {
        
        const promise = ChallengeRequest.findById(challengeRequest_id);
        searchHelper.populateTables2(populate, promise);
        promise.exec()
            .then(result => {                
                if(result){                    
                    resolve({
                        success: true,
                        status: 200,
                        challengeRequest: result
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

exports.delete = function(challengeRequest_id){
    return new Promise((resolve, reject) => {
        ChallengeRequest.deleteOne({_id: challengeRequest_id})
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

exports.update = function(challengeRequest_id, updateOps){
    return new Promise((resolve, reject) => {
        ChallengeRequest.update({ _id: challengeRequest_id}, { $set: updateOps})
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