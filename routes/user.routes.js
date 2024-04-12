const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user.model');

router.post('/signup', (req, res, next) => {
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

router.post('/signin', (req, res, next) => {
	let fetchedUser;
	User.findOne({ email: req.body.email })
		.then((user) => {
			console.log(user);
			if (!user) {
				return res.status(401).json({
					message: 'Invalid email',
				});
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then((result) => {
			if (!result) {
				return res.status(401).json({
					message: 'Invalid password',
				});
			}
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				'secret_for_auth_seng645',
				{
					expiresIn: '1h',
				}
			);
			return res.status(200).json({
				message: 'SignIn successfull.',
				data: {
					userId: fetchedUser._id,
					username: fetchedUser.username,
					email: fetchedUser.email,
					token: token,
					events: fetchedUser.events,
					expiresIn: 3600,
				},
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: 'Some unknown error occured. Try again later.',
			});
		});
});

module.exports = router;
