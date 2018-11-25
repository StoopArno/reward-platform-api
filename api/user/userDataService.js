const mongoose = require('mongoose');
const User = require('./userModel');
const jwt = require('jsonwebtoken');
const searchHelper = require('../../helper/searchHelper')

exports.authenticate = function(name, password){
    return new Promise((resolve, reject) => {
        User.findOne({name: name}, function(err, user){
            if(err){
                reject({ 
                    success: false,
                    status: 500,
                    error: err 
                });
            } else{                
                if(user){                    
                    if(password === user.password){                        
                        const token = jwt.sign({
                            _id:user._id,
                            name: user['name'],
                            currentPoints: user['currentPoints'],
                            totalPoints: user['totalPoints'],
                            isAdmin:user['isAdmin']
                        }, process.env.JWT_KEY);
                        
                        resolve({
                            success:true,
                            status: 200,
                            token: token
                        });
                        
                    } else{
                        reject({
                            success:false,
                            status: 401,
                            error: "Invalid credentials"
                        });
                    }
                }
                reject({
                    success:false,
                    status: 401,
                    error: "Invalid credentials"
                });
            }
        });
    });    
};

exports.filter = function(searchParams, sort){
    return new Promise((resolve, reject) => {
        const promise = User.find(searchParams);
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    users: result
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
        const promise = User.find();
        searchHelper.sortResult(sort, promise);
        promise.exec()
            .then(result => {
                resolve({
                    success: true,
                    status: 200,
                    users: result
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

exports.insert = function(userObj){
    return new Promise((resolve, reject) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: userObj.name,
            password: userObj.password,
            isAdmin: userObj.isAdmin,
            currentPoints: userObj.currentPoints,
            totalPoints: userObj.totalPoints
        }); 

        user.save()
            .then(result => {
                resolve({
                    success: true,
                    status: 201,
                    user: result
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

exports.find = function(user_id){
    return new Promise((resolve, reject) => {
        User.findById(user_id)
            .exec()
            .then(result => {
                if(result){
                    resolve({
                        success: true,
                        status: 200,
                        user: result
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

exports.delete = function(user_id){
    return new Promise((resolve, reject) => {
        User.deleteOne({_id: user_id})
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

exports.update = function(user_id, updateOps){
    return new Promise((resolve, reject) => {
        User.update({ _id: user_id}, { $set: updateOps})
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