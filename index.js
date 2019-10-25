// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

var app = express();
//Import routes
userRouter = require('./routes/userRoute')
placeRouter = require('./routes/placeRoute')

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended:false
}))  
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/place',placeRouter);

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/YassirSquareDB', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with yasminou'));

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});