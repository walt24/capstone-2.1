const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const models = require('./db/models');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.static('public'));
app.use(cookieParser('euyjb2e897bdl'));
app.use(bodyParser.urlencoded());
app.use(cors());

const passport = require('passport');
const localStrategy = require('./login-strategies.js').localStrategy;
const jwtCookieComboStrategy = require('./login-strategies.js').jwtCookieComboStrategy;

app.use(passport.initialize())
passport.use(localStrategy);
passport.use(jwtCookieComboStrategy);


const dashboardRouter = require('./dashboardRouter.js')
app.use('/dashboard',dashboardRouter)



//Public routes

app.get('/sign_up',(req,res)=>{
	return res.sendFile(__dirname+'/public/html/sign_up.html')
})

app.post('/sign_up',(req,res)=>{
	bcrypt.hash(req.body.password,10).then(function(hash){
		models.User.create(models.User.parser(req.body,hash),(err,user)=>{
			if(err){return res.send(err)}
				return res.redirect('/login');	
		})		
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

module.exports = app;

