m.route.mode = "pathname";
m.route(document, "/", {
	"/": require('./home'),
	"/home": require('./home'),
	"/home/modal": m.component(require('./home'), {show: true}),
	"/login": require('./login'),
	"/dashboard": require('./dashboard'),
	"/:page...": require('./notfound')
});
