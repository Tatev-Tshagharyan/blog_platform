const express = require('express');

const {register, login, updateUserDetails, logOut, verifyRefreshToken} = require('../controller/user.controller');
const { verifyAccessToken } = require('../middlewares/usermiddleware')
const {registerValidation} = require('../validation/registerValidation');
const { updateUserValidation } = require('../validation/updateUserValidation');
const userRouter = express.Router();


userRouter.get('/protected-route', verifyAccessToken)
userRouter.post('/register', registerValidation, register);
userRouter.post('/login',  login);
userRouter.put('/:userId', updateUserValidation, updateUserDetails);
userRouter.post('/logOut', logOut)
userRouter.post('/protected-route', verifyRefreshToken)

module.exports = userRouter;