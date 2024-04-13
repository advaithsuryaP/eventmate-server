const Registration = require('../models/registration.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');

exports.addRegistration = async (req, res, next) => {
	const register = new Registration({
		userId: req.body.userId,
		eventId: req.body.eventId,
		domainId: req.body.domainId,
		interests: req.body.interests,
	});

	try {
		// Add registration document to the Registration Collection
		await register.save();

		// Update the User Collection about the registered Event Id
		const user = await User.findById(req.body.userId);
		user.events.push(req.body.eventId);
		await user.save();

		// Update the count of registered users in Event Collection
		const event = await Event.findById(req.body.eventId);
		event.attendees.push(req.body.userId);
		await event.save();

		res.status(201).json({
			message: 'Event registration successfull',
			data: '',
		});
	} catch (e) {
		res.status(422).json({
			message: 'Error while registering for the event.',
		});
	}
};

exports.getRegistrations = (req, res, next) => {
	Registration.find().then((documents) => {
		res.status(200).json({
			message: 'Registrations fetched successfully.',
			data: documents,
		});
	});
};
