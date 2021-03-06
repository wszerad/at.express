import * as assert from 'assert';
import 'mocha';
import { app } from '../test-server';
import { req } from '../util';

describe('Error handling', function () {

	it('xhr', (done) => {
		req()
			.get('/errors/error')
			.set('X-Requested-With', 'XMLHttpRequest')
			.end((err, res) => {
				assert.equal(res.status, 501);
				assert.deepEqual(res.body, {
					message: 'advanced error',
					model: {meta: 7},
					status: 'error',
					stack: null
				});
				done();
			});
	});

	it('plain', (done) => {
		req()
			.get('/errors/error')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, 'advanced error');
				done();
			});
	});

	it('redirect', (done) => {
		app.set('ERROR_PATH', '/errors/error');

		req()
			.get('/errors/redirect')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.deepEqual(res.text, 'redirected');
				done();
			});
	});

});