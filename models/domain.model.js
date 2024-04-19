const mongoose = require('mongoose');

// Define the Domain schema
const domainSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		interests: [{ type: String, required: true }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Domain', domainSchema);
