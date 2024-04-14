const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registration.controller');

router.post('', registrationController.addRegistration);

router.get('', registrationController.getRegistrations);

router.delete('/:registrationId', registrationController.deleteRegistration);

module.exports = router;
