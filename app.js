require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const domainRoutes = require('./routes/domain.routes');
const registrationRoutes = require('./routes/registration.routes');

const config = require('./config/db.config');
config.connectDatabase();

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port);
