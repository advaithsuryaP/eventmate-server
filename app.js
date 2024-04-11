const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Domain = require('./models/domain.model');
const Event = require('./models/event.model');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.post('/api/events', (req, res, next) => {
	const event = new Event({
		image: req.body.image,
		title: req.body.title,
		description: req.body.description,
		domainId: req.body.domainId,
		location: req.body.location,
		date: req.body.date,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		attendees: req.body.attendees,
	});
	event
		.save()
		.then((document) => {
			res.status(201).json({
				message: 'Event created successfully.',
				data: document,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(422).json({
				message: 'Error while creating an event',
			});
		});
});

app.get('/api/events', (req, res, next) => {
	Event.find().then((documents) => {
		res.status(200).json({
			message: 'Events fetched successfully.',
			data: documents,
		});
	});
});

app.get('/api/event/:eventId', (req, res, next) => {
	Event.findById({ _id: req.params.eventId }).then((document) => {
		res.status(200).json({
			message: 'Event fetched successfully.',
			data: document,
		});
	});
});

app.get('/api/domains', (req, res, next) => {
	Domain.find().then((documents) => {
		res.status(200).json({
			message: 'Domains fetched successfully.',
			data: documents,
		});
	});
});

app.post('/api/domains', (req, res, next) => {
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

const port = process.env.PORT || 3000;

mongoose
	.connect(
		'mongodb+srv://advaith:qrlE9EyIBQgDdtpj@seng-645.dxkzx73.mongodb.net/eventmate?retryWrites=true&w=majority&appName=seng-645'
	)
	.then((result) => {
		console.log('Connected to database!');
		app.listen(port);
	})
	.catch((err) => {
		console.log('Error connecting to database');
	});
