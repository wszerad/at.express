import * as assert from 'assert';
import 'mocha';
import { req } from '../util';

describe('Swagger', function () {

	it('JSONSchema', (done) => {
		req().get('/swaggerApi').end((err, res) => {
			assert.equal(res.body, require('./swagger.response.json'));
			done();
		});
	});

});