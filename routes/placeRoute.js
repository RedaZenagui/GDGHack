// placeRoute.js
// Initialize express placeRouter
let placeRouter = require('express').Router();

// Import contact controller
var placeController = require('../controllers/placeController');
// Place routes
placeRouter.post('/update',placeController.upDate) 
placeRouter.post('/addPlaceReview',placeController.addPlaceReview)
placeRouter.get('/getPlaceReviews',placeController.getPlaceReviews)
placeRouter.get('/categorieReviews',placeController.categorieReviews)
//placeRouter.put('/:placeId',placeController.update)
placeRouter.delete('/deleteReview',placeController.deleteReview)

module.exports = placeRouter;