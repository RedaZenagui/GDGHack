//placeController
// Import user model
Place = require('../models/placeModel');
mongoose = require('mongoose')

exports.showPublic =  async function (req, res) {
    const places = await Place.find({public : true});
    res.send(places);
    
};

exports.index =  async function (req, res) {
    const places = await Place.find();
    res.send(places);
};

/* exports.add = function (req, res) {
    const place = new Place({
        name :req.body.name , 
        longtitude : req.body.longtitude , 
        latitude: req.body.latitude ,
    });
    place.save(function (err) {
        if(err) res.send(err);
        res.status(200).send(place)
    });
}; */

exports.addPlace = function (userID,req,res){
    const place = new Place({
        name :req.body.name , 
        adress: req.body.adress,
        city: req.body.city,
        description: req.body.description,
        rate: req.body.rate,
        longtitude : req.body.longtitude , 
        latitude: req.body.latitude ,
        user: userID,
    });

    place.save(function (err) {
        if (err) res.send(err);     
        res.status(200).send(place)           
    });
};

exports.getSavedPlaces = function (userID,res) {
    Place.find({user : userID},function (err, places) {
        if (err)
            console.log(err);
        else{
            res.status(200).send(places)  
        }
    });
};

exports.upDate = function (req,res) {
    Place.findById(req.body.placeId, function (err, place) {
        
        if (err) res.send(err);
        
        place.description= req.body.description,
        place.rate= req.body.rate,

        place.save(function (err) {

            if (err) res.json(err);
            
            res.send(place);
        });

    });
};

exports.modifyVisibility = function (req,res) {
    Place.findById(req.body.placeId, function (err, place) {
        
        if (err) res.send(err);
        
        place.public = true;

        place.save(function (err) {

            if (err) res.json(err);
            
            res.send(place);
        });

    });
};

exports.delete = async function (userID,req,res) {
    Project.deleteOne({user: userID, longtitude: req.body.longtitude, latitude: req.body.latitude}, function (err,msg) {
        if (err) res.send(err);
        res.status(200).send(msg);
    });
};
