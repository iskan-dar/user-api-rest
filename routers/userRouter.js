const { Router } = require('express');
const userController = require('../controllers/userController');
const { checkID, checkUserValues, checkIsFreeValue } = require('../middlewares/checkValues');

const userRouter = new Router();
// userRouter handles the route ==> /users

userRouter.get('/', userController.getUsers);

// checkUserValues checks all values which must not be falsy to provide to our model User
userRouter.post('/', checkUserValues, userController.createUser);

// checkID checks if the provided id is valid or not
userRouter.get('/:id', checkID, userController.getUser);

// As it is a PUT request we have to make sure besides all othe values the value of isFree property
// is updated too, so we use an additonal middleware to check that value either
userRouter.put('/:id', checkID, checkUserValues, checkIsFreeValue, userController.replaceUser);

// checkID checks if the provided id is valid or not. As it is a PATCH request we do not know
//  which values are provided, so we retrieve all values and work with them in controller
userRouter.patch('/:id', checkID, userController.updateUser);

// checkID checks if the provided id is valid or not
userRouter.delete('/:id', checkID, userController.deleteUser);

module.exports = userRouter;
