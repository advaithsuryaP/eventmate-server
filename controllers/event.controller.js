const Event = require('../models/event.model');

exports.getEvent = (req, res, next) => {
	Event.findById(req.params.eventId)
		.then((document) => {
			res.status(200).json({
				message: 'Event fetched successfully.',
				data: document,
			});
		})
		.catch((err) => {
			res.status(401).json({
				message: 'Error while fetching event',
			});
		});
};

exports.addEvent = (req, res, next) => {
	const event = new Event({
		image: req.body.image,
		title: req.body.title,
		description: req.body.description,
		creatorId: req.body.creatorId,
		domainId: req.body.domainId,
		location: req.body.location,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
	});
	event
		.save()
		.then((document) => {
			res.status(201).json({
				message: 'Event created successfully.',
				data: document,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while creating an event',
			});
		});
};

exports.updateEvent = (req, res, next) => {
	Event.findById(req.params.eventId)
		.then((document) => {
			document.image = req.body.image;
			document.title = req.body.title;
			document.description = req.body.description;
			document.creatorId = req.body.creatorId;
			document.domainId = req.body.domainId;
			document.location = req.body.location;
			document.startDate = req.body.startDate;
			document.endDate = req.body.endDate;

			return document.save();
		})
		.then((document) => {
			res.status(200).json({
				message: 'Event updated successfully',
				data: document,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while updating the event',
			});
		});
};

exports.getEvents = (req, res, next) => {
	Event.find().then((documents) => {
		res.status(200).json({
			message: 'Events fetched successfully.',
			data: documents,
		});
	});
};

exports.deleteEvent = (req, res, next) => {
	Event.deleteOne({ _id: req.params.eventId })
		.then((result) => {
			res.status(200).json({
				message: 'Event deleted successfully',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(401).json({
				message: 'Error while deleting the event',
			});
		});
};
