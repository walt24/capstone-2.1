const Biz = require('./biz');
const Location = require('./location');
const Offer = require('./offer');

Offer.parser = function(data){
	return {
		bizId: data.bizId,
		locationId: data.locationId,
		type: data.type,
		title: data.title,
		description: data.description
	}
}

module.exports = {Location,Biz,Offer}
