const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const models = require('./db/models');
const path = require('path');
const cors = require('cors');
const app = express();


/* passport functions, not working
const passport = require('passport');
const localStrategy = require('./login-strategies.js').local



app.use(passport.initialize())
passport.use(localStrategy);

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

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());


app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/html/index.html')
})

app.get('/dashboard',(req,res)=>{
	res.sendFile(__dirname+'/public/html/dashboard.html')
})

app.get('/login',(req,res)=>{
	res.sendFile(__dirname+'/public/html/login.html')
})
app.get('/sign_up',(req,res)=>{
	res.sendFile(__dirname+'/public/html/sign_up.html')
})
app.post('/sign_up',(req,res)=>{
	models.User.create(model.User.parser(req.body),(err,user)=>{
		if(err){return res.send(err)}
		res.redirect('/login');	
	})
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
	console.log(query);
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


app.listen(process.env.PORT||8080,()=>{
	console.log("Server started");
	mongoose.connect('mongodb://admin:Q123456@ds155424.mlab.com:55424/snatch',{useNewUrlParser: true}).then((err)=>{
		console.log("Connected to Mlab");
	}).catch((err)=>{
		console.log(err);
	});
})

