const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const models = require('./db/models');
const path = require('path');
const app = express();
const passport = require('passport');



app.use(passport.initialize())
app.use(express.static('public'));


app.use(cookieParser());


app.get('/dashboard',(req,res)=>{
	res.sendFile(__dirname+'/public/html/dashboard.html')
})

app.get('/login',(req,res)=>{
	res.sendFile(__dirname+'/public/html/login.html')
})

/*
app.post('/login',passport.authenticate('login',{ 
		successRedirect: '/dashboard',
  	failureRedirect: '/login',
  	failureFlash: true
	})
)



app.post('/offer',(req,res)=>{
	models.Offer.create(model.Offer.parser(req.body),(err,q)=>{
		if(err){ return res.json(err)}
		return res.send(q);
	})
})

*/
		
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/html/index.html')
})


app.get('/offers',(req,res)=>{
	models.Offer.find({},(err,q)=>{
		if(err){return res.send(err)}
		console.log('offers');
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
	console.log("Offer called")
	models.Offer.findById(req.params.id,(err,q)=>{
		if(err){return res.json(err)};
		console.log(q);
		return res.send(q);
	})
})


app.listen(8080,()=>{
	console.log("Server started");
	mongoose.connect('mongodb://admin:Q123456@ds155424.mlab.com:55424/snatch',{useNewUrlParser: true}).then((err)=>{
		console.log("Connected to Mlab");
	}).catch((err)=>{
		console.log(err);
	});
})

