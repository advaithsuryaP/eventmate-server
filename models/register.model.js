const mongoose = require('mongoose');

// Define the Register schema
const registerSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	eventId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true,
	},
	domainId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Domain',
		required: true,
	},
	interests: [{ type: String, required: true }],
});

module.exports = mongoose.model('Register', registerSchema);
