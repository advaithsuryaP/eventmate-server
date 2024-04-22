const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('', userController.getUsers);

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

module.exports = router;
