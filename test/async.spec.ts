import * as assert from 'assert';
import 'mocha';
import { req } from './util';

describe('Async methods', function () {

	it('async', (done) => {
		req().get('/async/async').end((err, res) => {
			assert.equal(res.text, 'async');
			done();
		});
	});

});