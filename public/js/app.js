var html = function(title, content){
	return (
		{tag: "html", attrs: {}, children: [
			{tag: "head", attrs: {}, children: [{tag: "title", attrs: {}, children: [title, " - Mithril sample"]}]}, 
			{tag: "body", attrs: {}, children: [
				{tag: "div", attrs: {}, children: [
					{tag: "h1", attrs: {}, children: [title]}, 
					nav(title), 
					content
				]}
			]}
		]}
	)
}
var nav = function(active){
	var list = ["home", "login", "dashboard"].map(function(page){
		if (active == page) return {tag: "li", attrs: {class:"active"}, children: [page]}
		else return {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:'/' + page, config:m.route}, children: [page]}]}
	})
	return {tag: "ul", attrs: {}, children: [list]}
}
var home = {
	view: function(){
		return html('home', 'home');
	}
};
var login = {
	view: function(){
		return html('login', 'login');
	}
};
var dashboard = {
	view: function(){
		return html('dashboard', 'dashboard');
	}
};
var notfound = {
	view: function(){
		var message = m.route.param('page') + ' is not found.';
		return html(message, message);
	}
};
//m.route.mode = "pathname";
m.route(document, "/", {
	"/": home,
	"/home": home,
	"/login": login,
	"/dashboard": dashboard,
	"/:page...": notfound
});
