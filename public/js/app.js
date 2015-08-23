var html = function(title, content){
	return (
		{tag: "html", attrs: {}, children: [
			{tag: "head", attrs: {}, children: [
				{tag: "title", attrs: {}, children: [title, " - Mithril sample"]}, 
				{tag: "link", attrs: {rel:"stylesheet", href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"}}, 
				{tag: "link", attrs: {rel:"stylesheet", href:"/css/style.css"}}
			]}, 
			{tag: "body", attrs: {class:"modal-open"}, children: [
				{tag: "nav", attrs: {class:"navbar navbar-inverse navbar-fixed-top"}, children: [
					{tag: "div", attrs: {class:"container"}, children: [
						{tag: "div", attrs: {class:"navbar-header"}, children: [
							{tag: "button", attrs: {type:"button", class:"navbar-toggle collapsed", "data-toggle":"collapse", "data-target":"#navbar", "aria-expanded":"false", "aria-controls":"navbar"}, children: [
								{tag: "span", attrs: {class:"sr-only"}, children: ["Toggle navigation"]}, 
								{tag: "span", attrs: {class:"icon-bar"}}, 
								{tag: "span", attrs: {class:"icon-bar"}}, 
								{tag: "span", attrs: {class:"icon-bar"}}
							]}, 
							{tag: "a", attrs: {class:"navbar-brand", href:"#"}, children: ["Project name"]}
						]}, 
						{tag: "div", attrs: {id:"navbar", class:"collapse navbar-collapse"}, children: [
							nav(title)
						]}
					]}
				]}, 

				{tag: "div", attrs: {class:"container"}, children: [

					{tag: "div", attrs: {class:"starter-template"}, children: [
						{tag: "h1", attrs: {}, children: ["Bootstrap starter template"]}, 
						{tag: "h2", attrs: {}, children: [title]}, 
						content
					]}

				]}
			]}
		]}
	)
}
var nav = function(active){
	var list = ["home", "login", "dashboard"].map(function(page){
		var classNames = active == page ? "active" : "";
		return {tag: "li", attrs: {class:classNames}, children: [{tag: "a", attrs: {href:'/' + page, config:m.route}, children: [page]}]}
	})
	return {tag: "ul", attrs: {class:"nav navbar-nav"}, children: [list]}
}

var Modal = {
	controller: function(){
		var visible = m.prop(false);
		return {
			visible: visible,
			toggle: function(el, isInitialized, context){
				if (!isInitialized) return;
				$(el).modal(visible() ? 'show' : 'hide');
			}
		}
	},
	view: function(ctrl, attrs, children){
		ctrl.visible(attrs.visible);
		return (
			{tag: "div", attrs: {class:"modal fade", config:ctrl.toggle, id:attrs.id, tabindex:"-1", role:"dialog", "aria-labelledby":attrs["aria-labelledby"], onshown:attrs.onshown, onhidden:attrs.onhidden}, children: [
				{tag: "div", attrs: {class:"modal-dialog", role:"document"}, children: [
					{tag: "div", attrs: {class:"modal-content"}, children: [children]}
				]}
			]}
		);
	}
}
Modal.Header = {
	view: function(ctrl, attrs, children){
		return (
			{tag: "div", attrs: {class:"modal-header"}, children: [
				{tag: "button", attrs: {type:"button", class:"close", "data-dismiss":"modal", "aria-label":"Close"}, children: [{tag: "span", attrs: {"aria-hidden":"true"}, children: ["×"]}]}, 
				children
			]}
		);
	}
}
Modal.Body = {
	view: function(ctrl, attrs, children){
		return (
			{tag: "div", attrs: {class:"modal-body"}, children: [children]}
		);
	}
}
Modal.Footer = {
	view: function(ctrl, attrs, children){
		return (
			{tag: "div", attrs: {class:"modal-footer"}, children: [children]}
		);
	}
}

var home = {
	controller: function(){
		return {
			show: m.prop(false)
		}
	},
	view: function(ctrl){
		return html('home', 
			{tag: "div", attrs: {}, children: [
				{tag: "button", attrs: {type:"button", class:"btn btn-primary btn-lg", onclick:ctrl.show.bind(ctrl, true)}, children: [
					"Launch demo modal"
				]}, 
				m.component(Modal, {onhidden:ctrl.show.bind(null, false), visible:ctrl.show()}, [
					m.component(Modal.Header, {}, ["Header"]), 
					m.component(Modal.Body, {}, ["Body"]), 
					m.component(Modal.Footer, {}, [
						{tag: "button", attrs: {type:"button", class:"btn btn-default", "data-dismiss":"modal"}, children: ["Close"]}, 
						{tag: "button", attrs: {type:"button", class:"btn btn-primary"}, children: ["Save changes"]}
					])
				])
			]}
		);
	}
};
var login = {
	view: function(){
		return html('login', {tag: "p", attrs: {class:"lead"}, children: ["login"]});
	}
};
var dashboard = {
	view: function(){
		return html('dashboard', {tag: "p", attrs: {class:"lead"}, children: ["dashboard"]});
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
