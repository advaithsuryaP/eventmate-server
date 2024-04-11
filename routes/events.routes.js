const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const Event = require('../models/event.model');

router.get('/:eventId', authenticate, (req, res, next) => {
	Event.findById({ _id: req.params.eventId }).then((document) => {
		res.status(200).json({
			message: 'Event fetched successfully.',
			data: document,
		});
	});
});

router.post('', (req, res, next) => {
	const event = new Event({
		image: req.body.image,
		title: req.body.title,
		description: req.body.description,
		domainId: req.body.domainId,
		location: req.body.location,
		date: req.body.date,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		attendees: req.body.attendees,
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
});

router.get('', (req, res, next) => {
	Event.find().then((documents) => {
		res.status(200).json({
			message: 'Events fetched successfully.',
			data: documents,
		});
	});
});

module.exports = router;
