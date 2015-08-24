var Modal = module.exports = exports = {
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
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
