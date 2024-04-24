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
				message: 'Event registration successfull',
				data: document,
			});
		})
		.catch((error) => {
			res.status(422).json({
				message: 'Error while registering for the event.',
			});
		});
};

exports.deleteRegistration = (req, res, next) => {
	Registration.deleteOne({ _id: req.params.registrationId })
		.then((result) => {
			res.status(200).json({
				message: 'Registration cancelled successfully',
				data: result,
			});
		})
		.catch((err) => {
			res.status(401).json({
				message: 'Error while canceling the registration',
			});
		});
};

exports.getRegistrations = (req, res, next) => {
	let query = {};
	if (req.query.userId) {
		query.userId = req.query.userId;
	}
	if (req.query.eventId) {
		query.eventId = req.query.eventId;
	}
	Registration.find(query)
		.then((documents) => {
			res.status(200).json({
				message: 'Registrations fetched successfully.',
				data: documents,
			});
		})
		.catch((err) => {
			res.status(422).json({
				message: 'Error while fetching registrations',
			});
		});
};

exports.getRecommendations = (req, res, next) => {
	const { userId, eventId, interests } = req.body;
	Registration.find({
		eventId: eventId,
		userId: { $ne: userId },
		interests: { $in: interests },
	})
		.then((documents) => {
			res.status(200).json({
				message: 'Event mates fetched successfully',
				data: documents,
			});
		})
		.catch((err) => {
			res.status(422).json({
				message: 'Error while computing event mates',
			});
		});
};

exports.updateRegistration = (req, res, next) => {
	Registration.findByIdAndUpdate(
		req.body.registrationId,
		{ $set: { interests: req.body.interests } }, // Replace interests array
		{ new: true } // Option to return the updated document
	)
		.then((result) => {
			res.status(200).json({
				message: 'Registration updated successfully',
				data: result,
			});
		})
		.catch((err) => {
			res.status(422).json({
				message: 'Error during updating registration',
			});
		});
};
