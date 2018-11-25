const mongoose = require('mongoose');
const Challenge = require('./challengeModel');
const searchHelper = require('../../helper/searchHelper')

exports.filter = function(searchParams, sort){
    return new Promise((resolve, reject) => {
        const promise = Challenge.find(searchParams);
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    challenges: result
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

exports.findAll = function(sort){
    return new Promise((resolve, reject) => {
        const promise = Challenge.find();
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    challenges: result
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

exports.insert = function(challengeObj){
    return new Promise((resolve, reject) => {
        const challenge = new Challenge({
            _id: new mongoose.Types.ObjectId(),
            title: challengeObj.title,
            points: challengeObj.points,
            limit: challengeObj.limit,
            isAvailable: challengeObj.isAvailable
        }); 

        challenge.save()
            .then(result => {
                resolve({
                    success: true,
                    status: 201,
                    challenge: result
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

exports.find = function(challenge_id){
    return new Promise((resolve, reject) => {
        Challenge.findById(challenge_id)
            .exec()
            .then(result => {
                if(result){
                    resolve({
                        success: true,
                        status: 200,
                        challenge: result
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

exports.delete = function(challenge_id){
    return new Promise((resolve, reject) => {
        Challenge.deleteOne({_id: challenge_id})
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

exports.update = function(challenge_id, updateOps){
    return new Promise((resolve, reject) => {
        Challenge.update({ _id: challenge_id}, { $set: updateOps})
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