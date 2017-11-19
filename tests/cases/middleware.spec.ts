import * as assert from 'assert';
import 'mocha';
import { req } from '../util';


describe('Middleware', function () {

	it('for method', (done) => {
		req().get('/middleware_raw/method').end((err, res) => {
			assert.equal(res.text, 'B');
			done();
		});
	});

	it('for controller', (done) => {
		req().get('/middleware/controller').end((err, res) => {
			assert.equal(res.text, 'A');
			done();
		});
	});

	it('both', (done) => {
		req().get('/middleware/both').end((err, res) => {
			assert.equal(res.text, 'AC');
			done();
		});
	});

	it('after', (done) => {
		req().get('/middleware_raw/send').end((err, res) => {
			assert.equal(res.text, 'send');
			done();
		});
	});

	it('extended', (done) => {
		req().get('/middleware_extended/both').end((err, res) => {
			assert.equal(res.text, 'C');
			done();
		});
	});

});