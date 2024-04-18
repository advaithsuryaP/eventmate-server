const Domain = require('../models/domain.model');

exports.getDomains = (req, res, next) => {
    Domain.find().then((documents) => {
        res.status(200).json({
            message: 'Domains fetched successfully.',
            data: documents,
        });
    });
};

exports.getDomain = (req, res, next) => {
    Domain.findById(req.params.domainId)
        .then((document) => {
            res.status(200).json({
                message: 'Domain fetched successfully.',
                data: document,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                message: 'Error while fetching domain',
            });
        });
};

exports.addDomain = (req, res, next) => {
    const domain = new Domain({
        icon: req.body.icon,
        name: req.body.name,
        description: req.body.description,
        interests: req.body.interests,
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
};

exports.deleteDomain = (req, res, next) => {
    Domain.deleteOne({ _id: req.params.domainId })
        .then((result) => {
            res.status(200).json({
                message: 'Domain deleted successfully',
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                message: 'Error while deleting the domain',
            });
        });
};
