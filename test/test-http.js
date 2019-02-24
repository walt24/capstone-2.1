const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Run HTTP test for all routes',function(){
	it('Request index page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request sign up page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/sign_up')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request offers page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/offers')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			done();
		})
	});

	it('Request offers page with location parameter set to Texas',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/offers/location-Texas')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://protected-tor-19699.herokuapp.com')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			done();
		})
	});



})
