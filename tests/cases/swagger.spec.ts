import * as assert from 'assert';
import 'mocha';
import { req } from '../util';

describe('Swagger', function () {

	it('JSONSchema', (done) => {
		req().get('/API').end((err, res) => {
			assert.equal(res.text, JSON.stringify(require('./swagger.response.json')));
			done();
		});
	});

});