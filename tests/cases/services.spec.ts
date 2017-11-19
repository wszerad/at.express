import * as assert from 'assert';
import 'mocha';
import { req } from '../util';


describe('Services', function () {

	it('new instance', (done) => {
		req().get('/services/inject').end((err, res) => {
			assert.equal(res.text, 'ts');
			done();
		});
	});

	it('fresh instance', (done) => {
		req().get('/services/inject').end((err, res) => {
			assert.equal(res.text, 'ts');
			done();
		});
	});

});