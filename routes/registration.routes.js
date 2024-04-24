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
	'/get-eventmate-recommendations',
	authenticate,
	registrationController.getRecommendations
);

router.put(
	'/update-registration',
	authenticate,
	registrationController.updateRegistration
);

module.exports = router;
