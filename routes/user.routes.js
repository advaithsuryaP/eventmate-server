const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user.model');

router.post('/register', (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const user = new User({
			email: req.body.email,
			username: req.body.username,
			password: hash,
			events: [],
		});
		user.save()
			.then((result) => {
				res.status(201).json({
					message: 'User registered successfully.',
					data: result.username,
				});
			})
			.catch((err) => {
				res.status(422).json({
					message: 'Error in registering user',
					error: err,
				});
			});
	});
});

module.exports = router;
