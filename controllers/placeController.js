//placeController
// Import user model
Place = require('../models/placeReviewModel');
mongoose = require('mongoose')

exports.index =  async function (req, res) {
    const placesReviews = await Place.find();
    res.send(places);
};


exports.addPlaceReview = function (req,res){
    console.log('heey')
    const placeReview = new Place({
        name :req.body.name , //change later
        adress: req.body.adress, //change later
        city: req.body.city,  //change later
        description: req.body.description,
         longtitude : req.body.longtitude , //change later
         latitude: req.body.latitude ,  //change later
    });
    const categorie = { 
        categName : req.body.categName,
        accessibleSinks : req.body.accessibleSinks,
        menuWithBS : req.body.menuWithBS,
        guideDogsA : req.body.guideDogsA,
        largePrintM : req.body.largePrintM,
        accessibleT : req.body.accessibleT,
        offeredAssistance : req.body.offeredAssistance,
        autoEasyDoors : req.body.autoEasyDoors,
    }
    const review = {
                   rate : req.body.rate,
                   user: req.body.userID,
                   categorie : categorie,
                   comment : req.body.comment,
                }
    
    placeReview.review.push(review) ;
    placeReview.save(function (err) {
        if (err) res.send(err);     
        res.status(200).send(placeReview)           
    });
};
exports.categorieReviews = function (req,res) {
    console.log(req.body.categName);
Place.find( function(err,places) {
    if(err)
      console.log(err);
    else
      {
          var resultPlaces = [] ;
          var place 
          var i=0;
          for(var place of places)
          {
            //   console.log('heey')
              console.log(place.review[0].categorie.acceuil)
              if(place.review[0].categorie.categName === req.body.categName) {
                console.log(place)
                resultPlaces[i] = place;
                i++;
              }
               
          }
          res.status(200).send(resultPlaces);
      }
} )

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
