const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

mongoose
	.connect(
		'mongodb+srv://advaith:qrlE9EyIBQgDdtpj@seng-645.dxkzx73.mongodb.net/?retryWrites=true&w=majority&appName=seng-645'
	)
	.then((result) => {
		console.log('Connected to database!');
		app.listen(port);
	})
	.catch((err) => {
		console.log('Error connecting to database');
	});
