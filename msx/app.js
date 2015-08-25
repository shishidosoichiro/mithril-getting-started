var Home = require('./home');
var Login = require('./login');
var Dashboard = require('./dashboard');
var NotFound = require('./notfound');

m.route.mode = "pathname";
m.route(document, "/", {
	"/": Home,
	"/home": Home,
	"/home/modal": <Home show="true"/>,
	"/login": Login,
	"/dashboard": Dashboard,
	"/:page...": NotFound
});
