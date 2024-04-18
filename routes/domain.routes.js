const express = require('express');
const router = express.Router();

const domainController = require('../controllers/domain.controller');

router.get('', domainController.getDomains);

router.post('', domainController.addDomain);

router.get('/:domainId', domainController.getDomain);

router.delete('/:domainId', domainController.deleteDomain);

module.exports = router;
