import { Controller } from './classes/Controller';
import { Middleware } from './classes/Middleware';

interface ControllerC {
	new?(): Controller;
	router(app);
	createRouter();
	[key: string]: any;
}

interface MiddlewareC {
	new?(): Middleware;
	[key: string]: any;
}

declare type InjectableI = Controller | Middleware
declare type InjectableC = ControllerC | MiddlewareC;
declare type Metastorable = InjectableC | Function;