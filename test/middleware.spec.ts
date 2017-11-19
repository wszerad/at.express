import * as assert from 'assert';
import 'mocha';
import { req } from './util';


describe('Middleware', function () {

	it('for method', (done) => {
		req().get('/middleware/middleware').end((err, res) => {
			assert.equal(res.text, '+');
			done();
		});
	});

	it('for controller', (done) => {
		req().get('/middleware/middleware').end((err, res) => {
			assert.equal(res.text, '+-+');
			done();
		});
	});

	it('both', (done) => {
		req().get('/middleware/middleware').end((err, res) => {
			assert.equal(res.text, '+-+');
			done();
		});
	});

});