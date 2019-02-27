const express = require('express');
const router = express.Router();
const app = require('./index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const models = require('./db/models');

const passport = require('passport');
const localStrategy = require('./login-strategies.js').localStrategy;
const jwtCookieComboStrategy = require('./login-strategies.js').jwtCookieComboStrategy;



router.post('/login',passport.authenticate('local',{session: false,failureRedirect: '/login'}),(req,res)=>{
		let token = jwt.sign({user: req.body.username},'euyjb2e897bdl',{algorithm: 'HS384'})
		res.cookie('jwt',token,{
            httpOnly: true,
            signed: true
        })
		return res.redirect('/dashboard');
	}
)

router.get('/logout',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
		res.clearCookie('jwt')
		return res.redirect('/login');
	}
)

router.get('/',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	return res.sendFile(__dirname+'/public/html/dashboard.html')
})

router.get('/offers',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	let user = jwt.decode(req.signedCookies.jwt).user;
	models.Offer.find({username: user,active: true}, (err,offers)=>{
		return res.json(offers);
	})
})

router.post('/offer',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	models.Offer.findByIdAndUpdate(req.body._id,{active: false}, (err,offer)=>{
		return res.json(offer);
	})
})

router.post('/offer',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	let user = jwt.decode(req.signedCookies.jwt).user;
	models.Offer.create(models.Offer.parser(req.body,user),(err,q)=>{
		if(err){ return res.json(err)}
		return res.redirect('/dashboard');
	})
})


module.exports = router;