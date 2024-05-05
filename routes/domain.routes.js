const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const domainController = require('../controllers/domain.controller');

router.get('', domainController.getDomains);

router.post('', authenticate, domainController.addDomain);

router.put('/:domainId', authenticate, domainController.updateDomain);

router.get('/:domainId', domainController.getDomain);

router.delete('/:domainId', authenticate, domainController.deleteDomain);

module.exports = router;
