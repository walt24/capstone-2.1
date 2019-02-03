const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const User = require('./db/user.js');


exports.local = passport.use(new localStategy(
	function(username,passord,callback){
		User.findOne({username: username},(err,user)=>{
			if(err){return callback(err)}
			if(!user){return callback(null,false,{message: 'Incorrect credentials'})}
			if(!(user.password == password)){return callback(null,false,{message: 'Incorrect credentials'})}
			return callback(null,user)	
		})
	}
))



