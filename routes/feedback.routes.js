const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const feedbackController = require('../controllers/feedback.controller');

router.post('', authenticate, feedbackController.addFeedback);

router.get('', authenticate, feedbackController.getAllFeedbacks);

router.get('/user/:userId', authenticate, feedbackController.getUserFeedbacks);

router.get(
	'/event/:eventId',
	authenticate,
	feedbackController.getEventFeedbacks
);

module.exports = router;
