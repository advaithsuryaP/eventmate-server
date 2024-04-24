const { Sequelize } = require('sequelize-cockroachdb');

const sequelize = new Sequelize(process.env.COCKROACHDB_URI, {
	dialectOptions: { cockroachdbTelemetryDisabled: true },
});
const Datatypes = Sequelize.DataTypes;

const Feedback = sequelize.define('Feedback', {
	id: {
		type: Datatypes.UUID,
		defaultValue: Datatypes.UUIDV4,
		primaryKey: true,
	},
	userId: {
		type: Datatypes.STRING,
		allowNull: false,
	},
	eventId: {
		type: Datatypes.STRING,
		allowNull: false,
	},
	comment: {
		type: Datatypes.TEXT,
		allowNull: false,
	},
	rating: {
		type: Datatypes.INTEGER,
		allowNull: false,
	},
});
Feedback.sync();

module.exports = Feedback;
