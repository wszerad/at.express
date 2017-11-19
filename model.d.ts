import { Controller } from './classes/Controller';
import { Middleware } from './classes/Middleware';

interface ControllerC {
	new(): Controller;
	router();
	createRouter();
}

interface MiddlewareC {
	new(): Middleware;
}

declare type InjectableI = Controller | Middleware
declare type InjectableC = ControllerC | MiddlewareC;
declare type Metastorable = InjectableC | Function;