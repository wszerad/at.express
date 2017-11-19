import * as assert from 'assert';
import 'mocha';
import { req } from '../util';

describe('Convert & Validate', function () {

	it('validation:valid', (done) => {
		req()
			.get('/convert_validate/data/1')
			.end((err, res) => {
				assert.deepEqual(res.body, {
					params: 1,
					paramsType: 'number'
				});
				done();
			});
	});

	it('validation:invalid', (done) => {
		req()
			.get('/convert_validate/data/-1')
			.end((err, res) => {
				assert.deepEqual(res.body, {
					params: -1,
					paramsType: 'number'
				});
				done();
			});
	});

	it('validation:throw', (done) => {
		req()
			.get('/convert_validate/data/a')
			.end((err, res) => {
				assert.equal(res.text, 'inconsistent data');
				done();
			});
	});

});