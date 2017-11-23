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
					paramsType: 'number',
					params2: '1',
					params2Type: 'string',
					params2TypeId: 'undefined'
				});
				done();
			});
	});

	it('validation:converted', (done) => {
		req()
			.get('/convert_validate/converter/1')
			.end((err, res) => {
				assert.deepEqual(res.body, {
					params: 1,
					paramsType: 'number',
					params2: '1',
					params2Type: 'string',
					params2Id: 1,
					params2TypeId: 'number'
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