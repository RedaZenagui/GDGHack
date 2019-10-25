// userModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: String,
    user_email: {
        type: String,
        required: true,
        unique: true,
        match: /\S+@\S+\.\S+/
    },
    user_password: {
        type: String,
        required: true,
    },
    user_username: {
        type: String,
        required: true,
    },
    favoritePlaces :[ 
        {
        place :{
            type :mongoose.Schema.Types.ObjectID ,
            ref : 'places',
        },
    }],    
});
// Export Contact model
var User = module.exports = mongoose.model('Users', userSchema);
//Add user picture
//Favotite Places