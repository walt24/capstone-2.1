const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const models = require('./db/models');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.static('public'));
app.use(cookieParser('euyjb2e897bdl'));
app.use(bodyParser.urlencoded());
app.use(cors());

//Passport functions
const passport = require('passport');
const localStrategy = require('./login-strategies.js').localStrategy;
const jwtCookieComboStrategy = require('./login-strategies.js').jwtCookieComboStrategy;
app.use(passport.initialize())
passport.use(localStrategy);
passport.use(jwtCookieComboStrategy);



//Routes that require authentication



app.post('/login',passport.authenticate('local',{session: false,failureRedirect: '/login'}),(req,res)=>{
		let token = jwt.sign({user: req.body.username},'euyjb2e897bdl',{algorithm: 'HS384'})
		res.cookie('jwt',token,{
            httpOnly: true,
            signed: true
        })
		return res.redirect('/dashboard');
	}
)

app.get('/logout',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
		res.clearCookie('jwt')
		return res.redirect('/login');
	}
)

app.get('/dashboard',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	console.log(req.user);
	return res.sendFile(__dirname+'/public/html/dashboard.html')
})

app.get('/dashboard/offers',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	let user = jwt.decode(req.signedCookies.jwt).user;
	models.Offer.find({username: user,active: true}, (err,offers)=>{
		return res.json(offers);
	})
})

app.post('/dashboard/offer',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	models.Offer.findByIdAndUpdate(req.body._id,{active: false}, (err,offer)=>{
		console.log(offer);
		return res.json(offer);
	})
})

app.post('/offer',passport.authenticate('jwt-cookiecombo',{session: false,failureRedirect: '/login'}),(req,res)=>{
	let user = jwt.decode(req.signedCookies.jwt).user;
	models.Offer.create(models.Offer.parser(req.body,user),(err,q)=>{
		if(err){ return res.json(err)}
		return res.redirect('/dashboard');
	})
})



//Public routes

app.get('/sign_up',(req,res)=>{
	return res.sendFile(__dirname+'/public/html/sign_up.html')
})

app.post('/sign_up',(req,res)=>{
	models.User.create(models.User.parser(req.body),(err,user)=>{
		if(err){return res.send(err)}
		return res.redirect('/login');	
	})
})

app.get('/login',(req,res)=>{
	return res.sendFile(__dirname+'/public/html/login.html')
})

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/html/index.html')
})

app.get('/offers',(req,res)=>{
	models.Offer.find({},(err,q)=>{
		if(err){return res.send(err)}
		return res.send(q)
	})
})

app.get('/offers/:category-:search',(req,res)=>{
	let query = {[req.params.category]: req.params.search}
	models.Offer.find(query,(err,q)=>{
		if(err){return res.send(err)}
		return res.send(q)
	})
})

app.get('/offer/:id',(req,res)=>{
	models.Offer.findById(req.params.id,(err,q)=>{
		if(err){return res.json(err)};
		console.log(q);
		return res.send(q);
	})
})


app.listen(process.env.PORT||8080,()=>{
	console.log("Server started");
	mongoose.connect('mongodb://admin:Q123456@ds155424.mlab.com:55424/snatch',{useNewUrlParser: true}).then((err)=>{
		console.log("Connected to Mlab");
	}).catch((err)=>{
		console.log(err);
	});
})

