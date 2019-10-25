//placeController
// Import user model
Place = require('../models/placeReviewModel');
mongoose = require('mongoose')

// exports.showPublic =  async function (req, res) {
//     const places = await Place.find({public : true});
//     res.send(places);
    
// };

exports.index =  async function (req, res) {
    const placesReviews = await Place.find();
    res.send(places);
};



exports.addPlaceReview = function (req,res){
    console.log('heey')
    const placeReview = new Place({
        name :req.body.name , //change later
        // adress: req.body.adress, //change later
        // city: req.body.city,  //change later
        // description: req.body.description,
         longtitude : req.body.longtitude , //change later
         latitude: req.body.latitude ,  //change later
    });
    const review = { rate : req.body.rate,
                   user: req.body.userID,
                   comment : req.body.comment,
                }
    placeReview.review[0] = review ;
    placeReview.save(function (err) {
        if (err) res.send(err);     
        res.status(200).send(placeReview)           
    });
};

exports.getPlaceReviews = function (req,res) {
    Place.find({longtitude : req.body.longtitude, latitude: req.body.latitude },function (err, places) {
        if (err)
            console.log(err);
        else{
            res.status(200).send(places)  
        }
    });
};

exports.upDate = function (req,res) {
    Place.findById(req.body.placeId, function (err, placeReview) {
        
        if (err) res.send(err);
        
        placeReview.description= req.body.description,
        placeReview.rate= req.body.rate,

        placeReview.save(function (err) {

            if (err) res.json(err);
            
            res.send(placeReview);
        });

    });
};


exports.deleteReview = async function (req,res) {
    Place.deleteOne({_id: req.body.id}, function (err,msg) {
        if (err) res.send(err);
        res.status(200).send(msg);
    });
};
