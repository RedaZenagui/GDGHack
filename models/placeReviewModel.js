// placeReviewModel.js
var mongoose = require('mongoose');
// Setup schema
var placeReviewSchema = mongoose.Schema({
    name: String, 
    adress: String, //Talk to Abdelkhalek and change it
//  generalRate : Number,  ?
    city: String, //Perhaps it's will go
    longtitude : Number, //M3aned Abdelkhalek
    latitude: Number , //M3aned Abdelkhalek
    review :[
        {   date : {
            type : Date,
            default : Date.now
            },
            categorie : {
                categName : String,
                accessibleSinks : Boolean,
                menuWithBS : Boolean,
                guideDogsA : Boolean,
                largePrintM : Boolean,
                accessibleT : Boolean,
                offeredAssistance : Boolean,
                autoEasyDoors : Boolean,
            },
            rate : Number,
            user :{
                type :mongoose.Schema.Types.ObjectID ,
                ref : 'Users',
            },
            comment : String,
        }
    ],
    
});
// Export Contact model
var Place = module.exports = mongoose.model('Places', placeReviewSchema);
//add rate moyenne ?
//Propriété (icone svg, titre, booléen)
//Place picture
//Report ?