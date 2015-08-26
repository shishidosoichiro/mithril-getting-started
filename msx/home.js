var m = require('mithril');

var layout = require('./layout');
var Modal = require('./bootstrap/modal');

module.exports = exports = {
	controller: function(args){
		return {
			show: m.prop((args && args.show) || false),
			onhidden: function(){
				m.route('/home');
			}
		}
	},
	view: function(ctrl){
		return layout('home',
			<div>
				<a class="btn btn-primary btn-lg" href="/home/modal" config={m.route}>Launch demo modal</a>

				<Modal onhidden={ctrl.onhidden} visible={ctrl.show()}>
					<Modal.Header>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4>Header of modal</h4>
					</Modal.Header>
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
