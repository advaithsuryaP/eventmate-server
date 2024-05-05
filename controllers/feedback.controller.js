const Feedback = require('../models/feedback.model');

exports.addFeedback = (req, res, next) => {
	Feedback.create({
		userId: req.body.userId,
		eventId: req.body.eventId,
		comment: req.body.comment,
		rating: req.body.rating,
	})
		.then((result) => {
			res.status(200).json({
				message: 'Feedback created successfully',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({ message: 'Error while creating feedback!' });
		});
};

exports.getAllFeedbacks = (req, res, next) => {
	Feedback.findAll()
		.then((result) => {
			res.status(200).json({
				message: 'Feedbacks fetched successfully',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while fetching feedbacks',
			});
		});
};

exports.getUserFeedbacks = (req, res, next) => {
	Feedback.findAll({ where: { userId: req.params.userId } })
		.then((result) => {
			res.status(200).json({
				message: 'User feedback fetched successfully',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while fetching user feedbacks',
			});
		});
};

exports.getEventFeedbacks = (req, res, next) => {
	Feedback.findAll({ where: { eventId: req.params.eventId } })
		.then((result) => {
			res.status(200).json({
				message: 'Event feedback fetched successfully',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while fetching event feedbacks',
			});
		});
};
