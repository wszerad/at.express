import { Controller } from './classes/Controller';
import { Middleware } from './classes/Middleware';

interface ControllerC {
	new?(): Controller;
	router(app);
	createRouter(stackedPath?: string);
	[key: string]: any;
}

interface MiddlewareC {
	new?(): Middleware;
	[key: string]: any;
}

declare type InjectableI = Controller | Middleware
declare type InjectableC = ControllerC | MiddlewareC;
declare type Metastorable = InjectableC | Function;

declare interface Schema {
	id?: string;
	key?: string;
	originalType?: string;
	enums?: {[key: string]: number} | {[key: string]: string}

	type?: string;
	title?: string;
	format?: string;
	default?: any;
	multipleOf?: number;
	maximum?: number;
	minimum?: number;
	maxLength?: number;
	minLength?: number;
	pattern?: RegExp;
	items?: any;
	maxItems?: number;
	minItems?: number;
	uniqueItems?: boolean;
	required?: boolean;
	properties?: { [key: string]: any };
	additionalProperties?: boolean;
	not?: any;
	enum?: any[];

	//patternProperties
	//dependencies
	//propertyNames
	//exclusiveMaximum?: number;
	//exclusiveMinimum?: number;
	//additionalItems
	//contains?: any;
	//const
}

declare interface DefaultCreator<def> {
	(): def;
}