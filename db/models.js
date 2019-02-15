const Biz = require('./biz');
const Location = require('./location');
const Offer = require('./offer');
const User = require('./user')


Offer.parser = function(data){
	return {
		bizId: data.bizId,
		locationId: data.locationId,
		type: data.type,
		title: data.title,
		description: data.description
	}
}
User.parser = function(data){
	return {
		username: data.username,
		password: data.password,
		email: data.email,
	}
}



module.exports = {Location,Biz,Offer,User}
