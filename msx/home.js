var layout = require('./layout');
var Modal = require('./modal');

module.exports = exports = {
	controller: function(args){
		return {
			show: m.prop((args && args.show) || false),
			submit: function(e){
				$(e.target).closest('.modal')
				.one(function(){m.route($(e.target).attr('href'))})
				.modal('hide')
			}
		}
	},
	view: function(ctrl){
		return layout('home',
			<div>
				<a class="btn btn-primary btn-lg" href="/home/modal" config={m.route}>Launch demo modal</a>

				<Modal onhidden={ctrl.show.bind(null, false)} visible={ctrl.show()}>
					<Modal.Header>
						<a class="close" href="/home" onclick={ctrl.submit} aria-label="Close"><span aria-hidden="true">&times;</span></a>
						Header of modal
					</Modal.Header>
					<Modal.Body>Body</Modal.Body>
					<Modal.Footer>
						<a class="btn btn-default" href="/home" onclick={ctrl.submit}>Close</a>
						<a class="btn btn-primary" href="/home" onclick={ctrl.submit}>Save changes</a>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
};
