//userController
// Import user model
User = require('../models/userModel');
mongoose = require('mongoose')
placeController = require('./placeController')

// Handle create user actions
exports.authentification = function (req, res) {
    console.log(req.body)
    //console.log(req.body.email)

    User.findOne({email : req.body.email}, (err,user) => {
        if (err) console.log(err)

    }).then(user => {
        if(user) {
            res.status(200).send(user)
        }
        else {
            var user = new User({
                fullName:  req.body.fullName,
                email: req.body.email, 
                
            });
            console.log(user._id);
        
            user.save(function (err) {
                res.status(202).send(user)
            });
    }
    
    })
    

    
    
};

// Handle view user info
exports.view = function (req, res) {
    console.log()
    User.findOne({email :req.params.email }, function (err, user) {
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
        user.email = req.body.email,
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

//add a Place
exports.addPlace =  function(req,res){
    User.findOne({email : req.body.email }, (err,user) => {
        if (err) console.log(err)
        console.log(user);

    }).then(user => {
        if(!user) {
            res.status(200).send('That email is not regestered')
        }
        else {
        placeController.addPlace(user._id,req,res)
        return
    }
    
    })
}

//get  userPlaces
exports.getSavedPlaces =  function(req,res){
    User.findOne({email : req.query.email }, (err,user) => {
        if (err) console.log(err)
        console.log(user);

    }).then(user => {
        if(!user) {
            res.status(200).send('That email is not regestered')
        }
        else {
        placeController.getSavedPlaces(user._id,res)
        return
    }
    
    })
}