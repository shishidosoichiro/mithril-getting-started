var m = require('mithril');

var Modal = module.exports = exports = {
	controller: function(attrs){
		var visible = m.prop(false);
		return {
			visible: visible,
			toggle: function(el, isInitialized, context){
				$(function(){
					$(el).modal(visible() ? 'show' : 'hide');
				})
			}
		}
	},
	view: function(ctrl, attrs, children){
		attrs = attrs || {};
		if (attrs.visible) {
			ctrl.visible(attrs.visible);
		}
		return (
			<div class="modal fade" config={ctrl.toggle} id={attrs.id} tabindex="-1" role="dialog" aria-labelledby={attrs["aria-labelledby"]} onshown={attrs.onshown} onhidden={attrs.onhidden}>
				<div class="modal-dialog" role="document">
					<div class="modal-content">{children}</div>
				</div>
			</div>
		);
	}
}
Modal.Header = {
	view: function(ctrl, attrs, children){
		return (
			<div class="modal-header">
				{children}
			</div>
		);
	}
}
Modal.Body = {
	view: function(ctrl, attrs, children){
		return (
			<div class="modal-body">{children}</div>
		);
	}
}
Modal.Footer = {
	view: function(ctrl, attrs, children){
		return (
			<div class="modal-footer">{children}</div>
		);
	}
}
