const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const domainRoutes = require('./routes/domain.routes');
const registrationRoutes = require('./routes/registration.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/register', registrationRoutes);

const port = process.env.PORT || 3000;

mongoose
	.connect(
		`mongodb+srv://advaith:${process.env.MONGODB_PASSWORD}@seng-645.dxkzx73.mongodb.net/eventmate?retryWrites=true&w=majority&appName=seng-645`
	)
	.then((result) => {
		console.log('Connected to database!');
		app.listen(port);
	})
	.catch((err) => {
		console.log('Error connecting to database');
	});
