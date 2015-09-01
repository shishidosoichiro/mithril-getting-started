var expect = require('chai').expect;
var jsdom = require("./mocha-jsdom");

var Home = require('../msx/home');
var m = require('mithril');

describe('Home', function(){

	this.timeout(5000);
	before(jsdom);

	it('has ...', function(done){
		var config = function(el){
			var $title = $(el).find('title');
			expect($title.length).to.equal(1);
			expect($title.html()).to.equal('home - Mithril sample');
			done()
		}
		var home = <html config={config}><Home /></html>;
		var html = m.render(document, home);
	})
})
