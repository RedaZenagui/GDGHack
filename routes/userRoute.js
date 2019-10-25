// userRoute.js
// Initialize express userRouter
let userRouter = require('express').Router();

// Import contact controller
var userController = require('../controllers/userController');
// User routes
userRouter.post('/addPlace',userController.addPlace)
userRouter.get('/getSavedPlaces',userController.getSavedPlaces)
userRouter.post('/',userController.authentification)
   
userRouter.get('/:userId',userController.view)
userRouter.put('/:userId',userController.update)
userRouter.delete('/:userId',userController.delete)

module.exports = userRouter;