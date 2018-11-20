const mongoose = require('mongoose');
const User = require('./userModel');
const jwt = require('jsonwebtoken');

exports.authenticate = function(req, res){
    User.findOne({name: req.body.name}, function(err, user){
        if(err){
            res.status(500).json({ error: err });
        } else{
            if(user){
                if(req.body.password === user.password){
                    const token = jwt.sign({
                        _id:user._id,
                        name: user['name'],
                        isAdmin:user['isAdmin']
                    }, process.env.JWT_KEY);

                    return res.status(200).json({
                        success:true,
                        token: token
                    });
                } 
            }
            res.status(404).json({success:false});
        }
    });
};

exports.findAll = function(req, res){
    User.find()
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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });  
    user.save()
        .then(result => {
            res.status(201).send({
                msg: 'Created user',
                user: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });  
}

exports.find = function(req, res){
    User.findById(req.params.userId)
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

exports.delete = function(req, res){
    User.deleteOne({_id: req.params.userId})
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
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id}, { $set: updateOps})
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