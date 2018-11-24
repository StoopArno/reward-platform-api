const mongoose = require('mongoose');
const User = require('./userModel');
const jwt = require('jsonwebtoken');

exports.authenticate = function(name, password){
    var retVal;
    User.findOne({name: name}, function(err, user){
        if(err){
            retVal = { 
                success: false,
                status: 500,
                error: err 
            };
        } else{
            
            if(user){
                
                if(password === user.password){
                    
                    const token = jwt.sign({
                        _id:user._id,
                        name: user['name'],
                        isAdmin:user['isAdmin']
                    }, process.env.JWT_KEY);
                    
                    retVal = {
                        success:true,
                        status: 200,
                        token: token
                    };
                    
                } else{
                    retVal = {
                        success:false,
                        status: 401,
                        error: "Invalid credentials"
                    };
                }
            }
            retVal = {
                success:false,
                status: 401,
                error: "Invalid credentials"
            };
        }
        return retVal;
    });
};

var exports = module.exports;