var m = require('mithril');
var layout = require('./layout');

module.exports = exports = {
	view: function(){
		return layout('login', <p class="lead">login</p>);
	}
};
