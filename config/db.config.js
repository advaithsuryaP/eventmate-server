const mongoose = require('mongoose');

exports.connectDatabase = async () => {
	try {
		const mongoDbConnection = await mongoose.connect(
			process.env.MONGODB_URI
		);
		console.log(`MongoDB Connected: ${mongoDbConnection.connection.host}`);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
