import * as assert from "assert";
import * as chai from 'chai';
import { server } from './server.spec';
import 'mocha';
import 'chai';
import 'chai-http'
import { req } from './util';

chai.use(require('chai-http'));

describe('Class', function() {

	after((done) => {
		server.close(function () {
			done();
		});
	});


	require('./methods.spec');
	require('./async.spec');
	require('./arguments.spec');


	/*
	describe('Controller inheritance', function () {

		it('1 level', (done) => {
			req().get('/test/method2').end((err, res) => {
				assert.equal(res.text, 'method2');
				done();
			});
		});

		it('2 level', (done) => {
			req().get('/test/method1').end((err, res) => {
				assert.equal(res.text, 'method1');
				done();
			});
		});

		it('scope', (done) => {
			req().get('/test/scope').end((err, res) => {
				assert.equal(res.text, 'scope');
				done();
			});
		});

		it('levels double use', (done) => {
			req().get('/test_parent/method2').end((err, res) => {
				assert.equal(res.text, 'method2');
				done();
			});
		});

	});

	describe('Middleware', function () {

		it('for method', (done) => {
			req().get('/test_parent/middleware').end((err, res) => {
				assert.equal(res.text, '+');
				done();
			});
		});

		it('for controller', (done) => {
			req().get('/test/middleware').end((err, res) => {
				assert.equal(res.text, '+-+');
				done();
			});
		});

	});

	describe('Services', function () {

		it('new instance', (done) => {
			req().get('/test/service').end((err, res) => {
				assert.equal(res.text, '012');
				done();
			});
		});

		it('fresh instance', (done) => {
			req().get('/test/service').end((err, res) => {
				assert.equal(res.text, '012');
				done();
			});
		});

	});

	describe('Nested controllers', function () {

		it('on top of controller', (done) => {
			req().get('/test/nested1/end').end((err, res) => {
					assert.equal(res.text, '--');
					done();
				});
		});

		it('inside controller', (done) => {
			req().get('/test/nested2/end').end((err, res) => {
					assert.equal(res.text, '+-+--');
					done();
				});
		});

	});

	describe('Error handling', function () {

		it('xhr', (done) => {
			req()
				.get('/test_parent/error')
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
				.get('/test_parent/error')
				.end((err, res) => {
					assert.equal(res.text, 'advanced error');
					done();
				});
		});

		it('redirect', (done) => {
			app.set('ERROR_PATH', '/test/arguments');
			const params = {params: '501'};

			req()
				.get('/test_parent/error')
				.end((err, res) => {
					assert.deepEqual(res.body.params, params);
					done();
				});
		});

	});*/

	// describe('Middleware', function () {
	//
	// 	it('type - simple', function () {
	// 		assert.equal(valueTpl(simple, key, $Model.definitions['Test']), `
	// 		raw['type']
	// 	`);
	// 	});
	// });

});

