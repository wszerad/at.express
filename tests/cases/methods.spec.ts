import * as assert from 'assert';
import 'mocha';
import 'chai';
import 'chai-http'
import { req } from '../util';

describe('Methods', function () {

	it('method:get', (done) => {
		req().get('/methods/get').end((err, res) => {
			assert.equal(res.text, 'get');
			done();
		});
	});

	it('method:post', (done) => {
		req().post('/methods/post').end((err, res) => {
			assert.equal(res.text, 'post');
			done();
		});
	});

	it('method:head', (done) => {
		req().head('/methods/head').end((err, res) => {
			assert.equal(err, null);
			done();
		});
	});

	it('method:put', (done) => {
		req().put('/methods/put').end((err, res) => {
			assert.equal(res.text, 'put');
			done();
		});
	});

	it('method:delete', (done) => {
		req().del('/methods/delete').end((err, res) => {
			assert.equal(res.text, 'delete');
			done();
		});
	});

	it('method:all(get)', (done) => {
		req().get('/methods/all').end((err, res) => {
			assert.equal(res.text, 'all');
			done();
		});
	});

	it('method:all(post)', (done) => {
		req().post('/methods/all').end((err, res) => {
			assert.equal(res.text, 'all');
			done();
		});
	});

});