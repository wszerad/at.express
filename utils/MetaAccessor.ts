import 'reflect-metadata';
import { ControllerC, Metastorable, MiddlewareC } from '../model';

const methodMetadata = Symbol();

export class MetaAccessor {

	static open(target: Metastorable): MetadataObject {
		let methodData = Reflect.getOwnMetadata(methodMetadata, target);

		if(!methodData) {
			methodData = new MetadataObject();
			Reflect.defineMetadata(methodMetadata, methodData, target);
		}

		return methodData;
	}

	static get(target: Metastorable): MetadataObject {
		return Reflect.getOwnMetadata(methodMetadata, target);
	}

	static merge(...targets: Metastorable[]): MetadataObject {
		return MetaAccessor.mergeMetas(
			...targets.map(target => MetaAccessor.get(target))
		);
	}

	static mergeMetas(...metas: MetadataObject[]): MetadataObject {
		const meta = new MetadataObject();

		return metas.reduce((meta, cMeta) => {
			meta.path = cMeta.path;
			meta.methodType = cMeta.methodType;
			meta.params = cMeta.params;
			meta.paramsTypes = cMeta.paramsTypes;
			meta.before = meta.before.concat(cMeta.before);
			meta.after = meta.after.concat(cMeta.after);
			meta.error = meta.error || cMeta.error;

			return meta;
		}, meta);
	}

}

export class MetadataObject {
	path: string;
	methodType: MethodTypes;
	params: string[] = [];
	paramsTypes: any[] = [];
	paramsValidate: boolean[] = [];
	before: MiddlewareC[] = [];
	after: MiddlewareC[] = [];
	nested: ControllerC[] = [];
	error: boolean = false;
}

export enum MethodTypes {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
	HEAD = 'head',
	USE = 'use',
	ALL = 'all'
}