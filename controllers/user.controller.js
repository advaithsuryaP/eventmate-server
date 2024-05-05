const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.getUsers = (req, res, next) => {
	User.find()
		.then((documents) => {
			res.status(200).json({
				message: 'Users fetched successfully',
				data: documents,
			});
		})
		.catch((error) => {
			res.status(404).json({
				message: 'Error while fetching users',
			});
		});
};

exports.flagUser = (req, res, next) => {
	User.findById(req.params.userId)
		.then((document) => {
			const isFlaggedValue = document.isFlagged;
			document.isFlagged = !isFlaggedValue;
			return document.save();
		})
		.then((document) => {
			res.status(200).json({
				message: 'User flagged successfully',
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while flagging the user',
			});
		});
};

exports.signUp = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const user = new User({
			email: req.body.email,
			username: req.body.username,
			password: hash,
			isAdmin: req.body.isAdmin,
			isFlagged: req.body.isFlagged,
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
