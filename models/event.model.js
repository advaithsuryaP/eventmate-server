const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		domainId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Domain',
			required: true,
		},
		location: { type: String, required: true },
		date: { type: Date, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
		attendees: [{ type: String }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
