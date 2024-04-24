const mongoose = require('mongoose');

const { Sequelize } = require('sequelize-cockroachdb');
const sequelize = new Sequelize(process.env.COCKROACHDB_URI);
const Feedback = require('../models/feedback.model');

exports.connectDatabase = async () => {
	try {
		const mongoDbConnection = await mongoose.connect(
			process.env.MONGODB_URI
		);
		console.log(`MongoDB Connected: ${mongoDbConnection.connection.host}`);

		await sequelize.authenticate();
		const syncResult = await Feedback.sync();
		console.log('Database Synchronized', syncResult);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
