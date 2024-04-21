const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const registrationController = require('../controllers/registration.controller');

router.get('', registrationController.getRegistrations);

router.post('', authenticate, registrationController.addRegistration);

router.delete(
	'/:registrationId',
	authenticate,
	registrationController.deleteRegistration
);

router.post(
	'/event-mates',
	authenticate,
	registrationController.computeEventMates
);

module.exports = router;
