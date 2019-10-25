// userModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    fullName: String, 
    email: String,     
});
// Export Contact model
var User = module.exports = mongoose.model('Users', userSchema);
