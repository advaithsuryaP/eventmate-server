const Registration = require('../models/registration.model');

exports.addRegistration = (req, res, next) => {
	const register = new Registration({
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
};

exports.getRegistrations = (req, res, next) => {
	Registration.find().then((documents) => {
		res.status(200).json({
			message: 'Registrations fetched successfully.',
			data: documents,
		});
	});
};
