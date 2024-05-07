const mongoose = require('mongoose');

// Define the Registration schema
const registrationSchema = new mongoose.Schema(
	{
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
		eventMates: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
