const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema ({
	bizId: mongoose.Schema.Types.ObjectId,
	code: String,
	address1: String,
	address2: String,
	city: String,
	state: String,
	zipCode: String,
	geoLocation: {
		lat: Number,
		long: Number
	}
});

const Location = mongoose.model('location',locationSchema)

module.exports = Location;