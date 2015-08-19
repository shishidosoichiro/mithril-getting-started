var html = function(title, content){
	return (
		<html>
			<head><title>{title} - Mithril sample</title></head>
			<body>
				<div>
					<h1>{title}</h1>
					{nav(title)}
					{content}
				</div>
			</body>
		</html>
	)
}
var nav = function(active){
	var list = ["home", "login", "dashboard"].map(function(page){
		if (active == page) return <li class="active">{page}</li>
		else return <li><a href={'/' + page} config={m.route}>{page}</a></li>
	})
	return <ul>{list}</ul>
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
