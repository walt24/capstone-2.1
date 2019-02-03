const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	bizId: mongoose.Schema.Types.ObjectId,
	type: String,
	title: String,
	description: String,
	category: String,
	location: String,
	banner: String
})

const Offer = mongoose.model('offers',offerSchema)

module.exports = Offer;
