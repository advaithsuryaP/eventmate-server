const express = require('express');
const router = express.Router();

const domainController = require('../controllers/domain.controller');

router.get('', domainController.getDomains);

router.post('', domainController.addDomain);

module.exports = router;
