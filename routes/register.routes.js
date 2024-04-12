const express = require('express');
const router = express.Router();

const Register = require('../models/register.model');

router.post('', (req, res, next) => {
	const register = new Register({
		userId: req.body.userId,
		eventId: req.body.eventId,
		domainId: req.body.domainId,
		interests: req.body.interests,
	});
	register
		.save()
		.then((document) => {
			res.status(201).json({
				message: 'Event registration created successfully.',
				data: document,
			});
		})
		.catch((err) => {
			res.status(422).json({
				message: 'Error while creating an event',
			});
		});
});

router.get('', (req, res, next) => {
	Register.find().then((documents) => {
		res.status(200).json({
			message: 'Registrations fetched successfully.',
			data: documents,
		});
	});
});

module.exports = router;
