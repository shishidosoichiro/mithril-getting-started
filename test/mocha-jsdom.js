var jsdom = require("jsdom");
module.exports = function(next){
	jsdom.env(
	  "<!doctype html>",
	  [
			"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"
	  ],
	  function (errors, window) {
			global.window = window;
			global.document = window.document;
			global.navigator = window.navigator;
			global.$ = window.$;
			$(function(){
				next()
			})
	  }
	);
}
