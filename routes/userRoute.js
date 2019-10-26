// userRoute.js
// Initialize express userRouter
let userRouter = require('express').Router();

// Import contact controller
var userController = require('../controllers/userController');
// User routes
userRouter.post('/signUp',userController.signup)
userRouter.post('/login',userController.login)
userRouter.post('/addFavoritePlace',userController.addFavoritePlace)
userRouter.get('/getFavoritesPlaces',userController.getFavoritesPlaces)
// userRouter.post('/',userController.authentification)
   
userRouter.get('/getUserInfo',userController.view)
// userRouter.put('/:userId',userController.update)
// userRouter.delete('/:userId',userController.delete)

module.exports = userRouter;