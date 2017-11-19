
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
	return metadata.params
		.map((param, index) => {
			const type = metadata.paramsTypes[index];
			const validate = metadata.paramsValidate[index];

			if(validate && type && Reflect.has(type, 'parse')) {
				return assignValidation(param, index);
			} else {
				return param;
			}
		})
		.concat('req', 'res')
		.join();
}

function assignValidation(dataSource: string, index: number) {
	return `(req[Symbol.for("${dataSource}")] = req[Symbol.for("${dataSource}")] || meta.paramsTypes[${index}].parse(${dataSource}))`;
}
