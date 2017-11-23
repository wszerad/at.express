import * as chai from 'chai';
import { server } from './test-server';
import 'mocha';
import 'chai';
import 'chai-http'

chai.use(require('chai-http'));

describe('Class', function() {

	after((done) => {
		server.close(function () {
			done();
		});
	});

	require('./cases/methods.spec');
	require('./cases/async.spec');
	require('./cases/arguments.spec');
	require('./cases/inheritance.spec');
	require('./cases/middleware.spec');
	require('./cases/services.spec');
	require('./cases/nested.spec');
	require('./cases/convert&validate.spec');
	require('./cases/swagger.spec');
	require('./cases/errors.spec');

});

