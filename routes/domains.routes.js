const express = require('express');
const router = express.Router();

const Domain = require('../models/domain.model');

router.get('', (req, res, next) => {
	Domain.find().then((documents) => {
		res.status(200).json({
			message: 'Domains fetched successfully.',
			data: documents,
		});
	});
});

router.post('', (req, res, next) => {
	const domain = new Domain({
		icon: req.body.icon,
		name: req.body.name,
		description: req.body.description,
		interests: req.body.interests,
		rank: req.body.rank,
	});
	domain
		.save()
		.then((response) => {
			res.status(201).json({
				message: 'Domain added successfully.',
				data: domain,
			});
		})
		.catch((err) => {
			res.status(422).json({
				message: 'Error while creating a domain',
			});
		});
});

module.exports = router;
