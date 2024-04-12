const mongoose = require('mongoose');

// Define the Domain schema
const domainSchema = new mongoose.Schema(
	{
		icon: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		interests: [{ type: String, required: true }],
		rank: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Domain', domainSchema);
