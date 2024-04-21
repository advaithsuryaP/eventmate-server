const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const eventController = require('../controllers/event.controller');

router.post('', eventController.addEvent);

router.get('', eventController.getEvents);

router.get('/:eventId', authenticate, eventController.getEvent);

router.put('/:eventId', authenticate, eventController.updateEvent);

router.delete('/:eventId', authenticate, eventController.deleteEvent);

module.exports = router;
