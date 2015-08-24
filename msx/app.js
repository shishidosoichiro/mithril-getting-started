var Modal = require('./modal');

var html = function(title, content){
	return (
		<html>
			<head>
				<title>{title} - Mithril sample</title>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
				<link key="1" rel="stylesheet" href="/css/style.css" />
			</head>
			<body class="modal-open">
				<nav class="navbar navbar-inverse navbar-fixed-top">
					<div class="container">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<a class="navbar-brand" href="#">Project name</a>
						</div>
						<div id="navbar" class="collapse navbar-collapse">
							{nav(title)}
						</div>
					</div>
				</nav>

				<div class="container">

					<div class="starter-template">
						<h1>Bootstrap starter template</h1>
						<h2>{title}</h2>
						{content}
					</div>

				</div>
			</body>
		</html>
	)
}
var nav = function(active){
	var list = ["home", "login", "dashboard"].map(function(page){
		var classNames = active == page ? "active" : "";
		return <li class={classNames}><a href={'/' + page} config={m.route}>{page}</a></li>
	})
	return <ul class="nav navbar-nav">{list}</ul>
}


var home = {
	controller: function(){
		return {
			show: m.prop(false)
		}
	},
	view: function(ctrl){
		return html('home', 
			<div>
				<button type="button" class="btn btn-primary btn-lg" onclick={ctrl.show.bind(ctrl, true)}>
					Launch demo modal
				</button>
				<Modal onhidden={ctrl.show.bind(null, false)} visible={ctrl.show()}>
					<Modal.Header>Header</Modal.Header>
					<Modal.Body>Body</Modal.Body>
					<Modal.Footer>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
};
var login = {
	view: function(){
		return html('login', <p class="lead">login</p>);
	}
};
var dashboard = {
	view: function(){
		return html('dashboard', <p class="lead">dashboard</p>);
	}
};
var notfound = {
	view: function(){
		var message = m.route.param('page') + ' is not found.';
		return html(message, message);
	}
};
m.route.mode = "pathname";
m.route(document, "/", {
	"/": home,
	"/home": home,
	"/login": login,
	"/dashboard": dashboard,
	"/:page...": notfound
});
