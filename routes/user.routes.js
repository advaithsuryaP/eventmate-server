const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const userController = require('../controllers/user.controller');

router.get('', userController.getUsers);

router.post('/flag-user/:userId', authenticate, userController.flagUser);

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

module.exports = router;
