const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.signUp = (req, res, next) => {
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
};

exports.signIn = (req, res, next) => {
	let fetchedUser;
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				throw new Error('Invalid authentication credentials');
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then((result) => {
			if (!result) {
				throw new Error('Invalid authentication credentials');
			}
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				process.env.JWT_KEY,
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
				message: 'Invalid authentication credentials!',
			});
		});
};
