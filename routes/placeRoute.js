// placeRoute.js
// Initialize express placeRouter
let placeRouter = require('express').Router();

// Import contact controller
var placeController = require('../controllers/placeController');
// Place routes
placeRouter.get('/',placeController.showPublic)
placeRouter.post('/makePublic',placeController.modifyVisibility)   
placeRouter.post('/update',placeController.upDate) 

//placeRouter.get('/:placeId',placeController.view)
//placeRouter.put('/:placeId',placeController.update)
//placeRouter.delete('/:placeId',placeController.delete)

module.exports = placeRouter;