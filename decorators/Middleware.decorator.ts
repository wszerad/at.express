import { Middleware } from '../classes/Middleware';
import { ControllerC, InjectableC, MiddlewareC } from '../model';
import { Injector } from '../utils/Injector';
import { MetaAccessor } from '../utils/MetaAccessor';

export function After<T extends MiddlewareC>(...middleware: T[]) {
	middleware.forEach(midd => {
		const instance = Injector.get(midd);
		MetaAccessor.open(midd);
		MetaAccessor.open((<Middleware>instance).use);
	});

	return function (target: MiddlewareC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.after.push(...middleware);
	}
}

export function Before<T extends MiddlewareC>(...middleware: T[]) {
	middleware.forEach(midd => {
		const instance = Injector.get(midd);
		MetaAccessor.open(midd);
		MetaAccessor.open((<Middleware>instance).use);
	});

	return function (target: MiddlewareC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.before.push(...middleware);
	}
}

export function Use<T extends ControllerC>(...middleware: T[]) {
	return function (target: InjectableC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.nested.push(...middleware);
	}
}