const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		domainId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Domain',
			required: true,
		},
		location: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
