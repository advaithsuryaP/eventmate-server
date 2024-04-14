const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true },
		password: { type: String, required: true, minLength: 4 },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
