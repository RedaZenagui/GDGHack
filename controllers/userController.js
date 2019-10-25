//userController
// Import user model
User = require('../models/userModel');
Place = require('../models/placeReviewModel')
mongoose = require('mongoose')
placeController = require('./placeController')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('.././config/config');

//login
exports.login = function (req, res){
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        User.findOne({user_username: username})
            .then((singleUser) => {
                bcrypt.compare(req.body.password, singleUser.user_password, function (err, result) {
                    if (result == true) {
                        let token = jwt.sign({username: singleUser.user_email, password: singleUser.user_password},
                            config.secret,
                            { expiresIn: '24h' // expires in 24 hours
                            }
                        );
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Incorrect username password',
                            error: err
                        });
                    }
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: 'Incorrect username',
                    error: err
                });
            });

    } else {
        res.sendStatus(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

// signup
exports.signup = function (req, res) {
    User.find({ email: req.body.user_email })
        .exec()
        .then( user => {
            console.log(user);
            if (user.length > 1) {
                return res.status(409).json({
                    message: 'Mail exist'
                })
            } else {
                bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            user_email: req.body.user_email,
                            user_password: hash,
                            user_username: req.body.user_username,
                            user_phone: req.body.user_phone,
                        });
                        return user
                            .save()
                            .then((newUser) => {
                                return res.status(201).json({
                                    success: true,
                                    message: 'New user created successfully',
                                    User: newUser,
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    success: false,
                                    message: 'Server error. Please try again.',
                                    error: error.message,
                                });
                            });
                    }
                });
            }
        });
}

exports.authorize = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                return res.json({
                    success: true,
                    message: 'Token is valid'
                });
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

// Handle view user info
exports.view = function (req, res) {
    console.log('hey')
    User.findOne({user_email :req.body.user_email }, function (err, user) {
        if (err)
            res.send(err);
        else{
            res.status(202).send(user);
        }
    });
};

// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        
        if (err) res.send(err);

        user.fullName = req.body.fullName,
        user.user_email = req.body.user_email,
        user.phoneNumber = req.body.phoneNumber ,
      

        user.save(function (err) {

            if (err) res.json(err);
            
            console.log(user);
            res.send(user);
        });

    });
};

// Handle delete user
exports.delete = async function (req, res) {
    User.deleteOne({ _id: req.params.userId }, function (err,msg) {
        if (err) res.send(err);
        res.status(203).send(msg);
        
    });
};


//get  favoritePlaces
exports.getFavoritesPlaces =  function(req,res){
    User.findOne({user_email : req.body.user_email }, (err,user) => {
        if (err) console.log(err)
        console.log(user);

    }).then(user => {
        if(!user) {
            res.status(200).send('That user_email is not registered')
        }
        else {
            Place.find({type :user.favoritePlaces.type}, (err,places) => {
                if (err) console.log(err)
                console.log(places);
                res.status(200).send(places);})
            
    }
    
    })
}

// Add a favorite place
exports.addFavoritePlace = function(req,res){
    User.findOne({user_email : req.body.user_email }, (err,user) => {
        if (err) console.log(err)
        // return user;
    }).then(user => {
        if(!user) {
            res.status(200).send('That user_email is not registered')
        }
        else {
            console.log(req.body.placeId)
            const place = {type : req.body.placeId };
            user.favoritePlaces.push(place);
            user.save()
            res.status(200).send(user.favoritePlaces);
    }
    
    })
}