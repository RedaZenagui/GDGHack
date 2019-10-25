// placeModel.js
var mongoose = require('mongoose');
// Setup schema
var placeSchema = mongoose.Schema({
    name: String, 
    adress: String,
    city: String,
    description: String,
    rate: Number,
    longtitude : Number, 
    latitude: Number ,
    public : {
        type: Boolean,
        default: false,
    },
    user :{
        type :mongoose.Schema.Types.ObjectID ,
        ref : 'Users',
    },
    
    contenu :[
        {
            rate : Number,
            user :{
                type :mongoose.Schema.Types.ObjectID ,
                ref : 'Users',
            },
            comments : [ 
                {
                    date : {
                        type : Date,
                        default : Date.now
                    },
                    text : String,
                }
            ]
        }
    ],
    
});
// Export Contact model
var Place = module.exports = mongoose.model('Places', placeSchema);