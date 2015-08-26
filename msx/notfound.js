var m = require('mithril');
var layout = require('./layout');

module.exports = exports = {
	view: function(){
		var message = m.route.param('page') + ' is not found.';
		return layout(message, message);
	}
};
