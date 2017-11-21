
import { MetadataObject } from './MetaAccessor';

export class RequestWrapper {

	static create(instance: any, method: Function, metadata: MetadataObject) {
		const executor = new Function('handler', 'meta', 'err', 'req', 'res', 'next', `
			Promise
				.resolve(handler(${metadataExtractor(metadata)}))
				.then(response => {
					if(!res.headersSent && response !== undefined) {
						res.send(response);
						res.end();
					} else if(!res.headersSent) {
						next();
					}
				})
				.catch(next);
		`);

		return metadata.error? executor.bind(null, method.bind(instance), metadata) : executor.bind(null, method.bind(instance), metadata, null);
	}

}

function metadataExtractor(metadata: MetadataObject) {
	return metadata.params.concat('req', 'res').join();
}