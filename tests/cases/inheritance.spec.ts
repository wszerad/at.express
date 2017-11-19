import * as assert from 'assert';
import 'mocha';
import { req } from '../util';


describe('Controller inheritance', function () {

	it('0 level', (done) => {
		req().get('/inheritance_parent/method1').end((err, res) => {
			assert.equal(res.text, 'inheritance_parent');
			done();
		});
	});

	it('1 level', (done) => {
		req().get('/inheritance/method1').end((err, res) => {
			assert.equal(res.text, 'inheritance');
			done();
		});
	});

	it('2 level', (done) => {
		req().get('/inheritance_child/method1').end((err, res) => {
			assert.equal(res.text, 'inheritance_child');
			done();
		});
	});



	it('levels double use', (done) => {
		req().get('/inheritance/method1').end((err, res) => {
			assert.equal(res.text, 'inheritance');
			done();
		});
	});

});