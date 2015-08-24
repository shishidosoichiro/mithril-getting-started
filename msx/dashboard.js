var layout = require('./layout');

module.exports = exports = {
	view: function(){
		return layout('dashboard', <p class="lead">dashboard</p>);
	}
};
