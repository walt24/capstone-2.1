const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Run HTTP test',function(){
	it('Request index page',function(done){
		chai.request('http://localhost:8080')
		.get('/')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://localhost:8080')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request sign up page',function(done){
		chai.request('http://localhost:8080')
		.get('/sign_up')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
			done();
		})
	});

	it('Request offers page',function(done){
		chai.request('http://localhost:8080')
		.get('/offers')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			done();
		})
	});

	it('Request offers page with location parameter set to Texas',function(done){
		chai.request('http://localhost:8080')
		.get('/offers/location-Texas')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://localhost:8080')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			done();
		})
	});

	it('Request login page',function(done){
		chai.request('http://localhost:8080')
		.get('/login')
		.end((err,res)=>{
			expect(res).to.have.status(200);
			done();
		})
	});



})
