const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.signUp = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const user = new User({
			email: req.body.email,
			username: req.body.username,
			password: hash,
			isAdmin: req.body.isAdmin,
			events: [],
		});
		user.save()
			.then((_) => {
				res.status(201).json({
					message: 'User registered successfully!',
				});
			})
			.catch((err) => {
				res.status(422).json({
					message: 'Error in registering user',
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
			const sanitizedUserObj = {
				...fetchedUser.toObject(),
				password: undefined,
			};
			return res.status(200).json({
				message: `User authentication successful.`,
				data: sanitizedUserObj,
				expiresIn: 3600, // 1 hour
				token: token,
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: 'Invalid authentication credentials!',
			});
		});
};
