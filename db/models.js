const Biz = require('./biz');
const Location = require('./location');
const Offer = require('./offer');
const User = require('./user')


Offer.parser = function(data,user){
	return {
		username: user,
		type: data.type,
		title: data.title,
		description: data.description,
		banner: data.banner,
		location: data.location,
		category: data.category,
		active: true
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
