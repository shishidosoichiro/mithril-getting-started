var expect = require('chai').expect;

var Modal = require('../../msx/bootstrap/modal');

describe('modal', function(){
	describe('Modal', function(){
		it('has class modal.', function(){
			var modal = <Modal />;
			var ctrl = new modal.controller();
			var dom = modal.view(ctrl);
			expect(dom).not.to.be.undefined;
			expect(dom.tag).to.equal('div');
			expect(dom.attrs.class).to.include('modal');
			expect(dom.attrs.class).to.include('fade');
		})
	})
	describe('Modal.Header', function(){
		it('has class modal-header.', function(){
			var modal = <Modal.Header />;
			var dom = modal.view();
			expect(dom).not.to.be.undefined;
			expect(dom.tag).to.equal('div');
			expect(dom.attrs.class).to.include('modal-header');
		})
	})
	describe('Modal.Footer', function(){
		it('has class modal-footer.', function(){
			var modal = <Modal.Footer />;
			var dom = modal.view();
			expect(dom).not.to.be.undefined;
			expect(dom.tag).to.equal('div');
			expect(dom.attrs.class).to.include('modal-footer');
		})
	})
})
