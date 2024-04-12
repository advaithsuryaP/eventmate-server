const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const eventController = require('../controllers/event.controller');

router.get('/:eventId', authenticate, eventController.getEvent);

router.post('', eventController.addEvent);

router.get('', eventController.getEvents);

module.exports = router;
