const passport = require('passport');
const localStategy = require('passport-local').Strategy;
var jwtCookieComboStrategy = require('passport-jwt-cookiecombo');
 

const User = require('./db/user.js');


exports.localStrategy = new localStategy(
	function(username,password,callback){
		console.log(username + ":" + password)
		User.findOne({username : username},(err,user)=>{
			console.log("this is the user"+ user)
			if(err){return callback(err)}
			if(!user){
				console.log('No user')
				return callback(null,false,{message: 'Incorrect credentials'})}
			if(!(user.password == password)){return callback(null,false,{message: 'Incorrect credentials'})}
			return callback(null,user)	
		})
	}
)

exports.jwtCookieComboStrategy = new jwtCookieComboStrategy({
	secretOrPublicKey: 'euyjb2e897bdl',
	jwtVerifyOptions: {
		algorithms: 'HS384'
	},
	passReqToCallback: false
	},
	function(payload,done){
		return done(null,payload.user,{});	
	}
)
