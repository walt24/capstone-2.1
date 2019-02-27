const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const jwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const bcrypt = require('bcrypt');

const User = require('./db/user.js');


exports.localStrategy = new localStategy(
	function(username,password,callback){
		User.findOne({username : username},(err,user)=>{	
			if(err){return callback(err)}
			if(!user){
				console.log('No user')
				return callback(null,false,{message: 'Incorrect credentials'})
			}
			bcrypt.compare(password,user.password).then(function(response){
				if(!response){return callback(null,false,{message: 'Incorrect credentials'})}
				return callback(null,user)		
			})				
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
