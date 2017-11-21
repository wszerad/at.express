import * as path from "path";
import { Controller } from '../classes/Controller';
import { Get } from '../decorators/RequestMethods.decorator';
import { Injector } from '../utils/Injector';
import { MetaAccessor, MetadataObject } from '../utils/MetaAccessor';

export class API extends Controller {

	host: string;
	basePath: string;
	tags: Set<string> = new Set();
	paths: Map<string, SwaggerPaths> = new Map();
	definitions: any = {};

	addMethod(stackedPath: string, controller: any, propertyKey: string) {
		const instance = Injector.get(controller);
		const meta = MetaAccessor.get(instance[propertyKey]);
		const sPath = path.posix.join(stackedPath, meta.path);

		let cPath = this.paths.get(sPath);

		if(!cPath) {
			cPath = {};
			this.paths.set(this.formatPath(sPath), cPath);
		}

		this.tags.add(controller.name);
		cPath[meta.methodType] = {
			tags: [controller.name],
			operationId: propertyKey,
			parameters: [],
			description: ''
		};

		meta.params.forEach((param, index) => {
			this.addParam(cPath[meta.methodType], meta, index);
		});

	}

	addParam(path: SwaggerPath, meta: MetadataObject, index: number) {
		const paramType = meta.paramsTypes[index];
		const schemaName = paramType && paramType.name;
		const param = meta.params[index];
		let ins: SwaggerParameterTypes;

		if(!schemaName || !Reflect.has(this.definitions, schemaName)) return;

		if(param === 'req.body') {
			path.parameters.push({
				name: 'body',
				in: SwaggerParameterTypes.BODY,
				schema: {$ref: `#/definitions/${paramType.name}` }
			});
		} else if((param === 'req.params' && (ins = SwaggerParameterTypes.PATH)) || (param === 'req.query'  && (ins = SwaggerParameterTypes.QUERY))) {
			const schema = this.definitions[schemaName];

			for(let i in schema.properties) {
				path.parameters.push({
					name: i,
					in: ins,
					...schema.properties[i]
				});
			}
		}
	}

	formatPath(path: string): string {
		return path.replace(/(\:[^/]+)/g, (match) => `{${match.slice(1)}}`)
	}

	@Get('*')
	swagger() {
		return <SwaggerSchema>{
			swagger: '2.0',
			host: this.host,
			basePath: this.basePath,
			tags: Array.from(this.tags.values())
				.map(name => ({ name })),
			paths: Array.from(this.paths.entries())
				.reduce((paths, [key, path]) => {
					paths[key] = path;
					return paths;
				}, {}),
			definitions: this.definitions
		}
	}

	static configure({host, basePath, apiPath = '/api', definitions}: APIConfig) {
		const instance = <API>Injector.get(API);
		instance.host = host;
		instance.definitions = definitions;
		instance.basePath = basePath;

		MetaAccessor.open(API).path = apiPath;

		return API;
	}

}

interface APIConfig {
	host: string;
	basePath: string;
	apiPath?: string;
	definitions: any;
}

interface SwaggerSchema {
	swagger: string;
	host: string;
	basePath: string;
	tags: SwaggerTag[];
	paths: SwaggerPaths;
	definitions: {[key: string]: any}
}

interface SwaggerTag {
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