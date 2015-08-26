var expect = require('chai').expect;

var Home = require('../msx/home');

describe('Home', function(){
	it('has ...', function(){
		var home = <Home />;
		var ctrl = new home.controller();
		var dom = home.view(ctrl);
		expect(dom).not.to.be.undefined;
		expect(dom.tag).to.equal('html');
		console.log(dom);
	})
})
