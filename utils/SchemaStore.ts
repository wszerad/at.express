import { ControllerC } from '../model';
import { Injector } from './Injector';
import { MetaAccessor, MetadataObject } from './MetaAccessor';

class SchemaStoreConstructor {

	private tags: Set<string> = new Set();
	private paths: Map<string, SwaggerPaths> = new Map();

	addMethod(controller: ControllerC, propertyKey: string) {
		const instance = Injector.get(controller);
		const cMeta = MetaAccessor.get(controller);
		const meta = MetaAccessor.get(instance[propertyKey]);
		const sPath = cMeta.path + meta.path;

		let path = this.paths.get(sPath);

		if(!path) {
			path = {};
			this.paths.set(sPath, path);
		}

		this.tags.add(controller.name);
		path[meta.methodType] = {
			tags: [controller.name],
			operationId: propertyKey,
			parameters: [],
			description: ''
		};

		meta.params.forEach((param, index) => {
			this.addParam(path[meta.methodType], meta, index);
		});

	}

	addParam(path: SwaggerPath, meta: MetadataObject, index: number) {
		const paramType = meta.paramsTypes[index];
		const schema = paramType.schema && paramType.schema();
		const param = meta.params[index];

		if(!schema) {
			return;
		}

		if(param === 'req.body') {
			path.parameters.push({
				name: 'body',
				in: SwaggerParameterTypes.BODY,
				schema
			});
		} else if(param === 'req.params') {
			for(let i in schema.properties) {
				path.parameters.push({
					name: i,
					in: SwaggerParameterTypes.PATH,
					type: schema.properties[i].type,
					required: schema.properties[i].required
				});
			}
		} else if(param === 'req.query') {
			for(let i in schema.properties) {
				path.parameters.push({
					name: i,
					in: SwaggerParameterTypes.QUERY,
					type: schema.properties[i].type,
					required: schema.properties[i].required
				});
			}
		}

	}

	getJSONSchema(host: string, basePath: string): SwaggerSchema {
		return {
			swagger: '2.0',
			host,
			basePath,
			tags: Array.from(this.tags.values())
				.map(name => ({ name })),
			paths: Array.from(this.paths.entries())
				.reduce((paths, [key, path]) => {
					paths[key] = path;
					return paths;
				}, {}),
		}
	}
}

export const SchemaStore = new SchemaStoreConstructor();

interface SwaggerSchema {
	swagger: string;
	host: string;
	basePath: string;
	tags: SwaggerTags[];
	paths: {[key: string]: SwaggerPath};
}

interface SwaggerTags {
	name: string;
	description?: string;
}

interface SwaggerPaths {
	[key: string]: SwaggerPath;
}

interface SwaggerPath {
	tags: string[];
	description: string;
	operationId: string;
	parameters: SwaggerParameter[];
}

interface SwaggerParameter {
	name: string;
	in: SwaggerParameterTypes;
	schema?: {$ref: string};
	type?: string;
	required?: boolean;
}

enum SwaggerParameterTypes {
	BODY = 'body',
	QUERY = 'query',
	PATH = 'path'
}
