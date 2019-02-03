const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bizSchema = new Schema({
	name: String,
	type: String,
	description: String
})

const Biz = mongoose.model('Biz', bizSchema);

module.exports = Biz;