const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
	bizId: mongoose.Schema.Types.ObjectId,
	username: String,
	type: String,
	title: String,
	description: String,
	category: String,
	location: String,
	banner: String,
	active: Boolean
})

const Offer = mongoose.model('offers',offerSchema)

module.exports = Offer;
