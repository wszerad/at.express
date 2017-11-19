import * as assert from 'assert';
import 'mocha';
import { req } from '../util';

describe('Nested controllers', function () {

	it('on top of controller', (done) => {
		req().get('/nested1/nested/end').end((err, res) => {
			assert.equal(res.text, '');
			done();
		});
	});

	it('inside controller', (done) => {
		req().get('/nested2/nested/end').end((err, res) => {
			assert.equal(res.text, 'AA');
			done();
		});
	});

});