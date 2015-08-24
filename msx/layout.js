module.exports = exports = function(title, content){
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
