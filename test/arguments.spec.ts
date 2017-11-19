import * as assert from 'assert';
import 'mocha';
import { req } from './util';

describe('Request arguments', function () {

	it('argument:@Body', (done) => {
		const body = {body: 'body'};

		req()
			.post('/arguments/arguments/a')
			.send(body)
			.end((err, res) => {
				assert.deepEqual(res.body.body, body);
				done();
			});
	});

	it('argument:@Query', (done) => {
		const query = {query: 'query'};

		req()
			.post('/arguments/arguments/a')
			.query(query)
			.end((err, res) => {
				assert.deepEqual(res.body.query, query);
				done();
			});
	});

	it('argument:@Params', (done) => {
		const params = {params: 'params'};

		req()
			.post('/arguments/arguments/params')
			.end((err, res) => {
				assert.deepEqual(res.body.params, params);
				done();
			});
	});

});