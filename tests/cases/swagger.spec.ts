import * as assert from 'assert';
import 'mocha';
import { SchemaStore } from '../../utils/SchemaStore';

describe('Swagger', function () {

	it('JSONSchema', (done) => {
		const schema = SchemaStore.getJSONSchema('127.0.0.1', '/api');
		assert.equal(schema.paths['/swagger/swagger'], {});
		done();
	});

});