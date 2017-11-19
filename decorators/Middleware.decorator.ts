import { ControllerC, InjectableC, MiddlewareC } from '../model';
import { MetaAccessor } from '../utils/MetaAccessor';

export function After(...middleware: MiddlewareC[]) {
	return function (target: InjectableC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.after.push(...middleware);
	}
}

export function Before(...middleware: MiddlewareC[]) {
	return function (target: InjectableC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.before.push(...middleware);
	}
}

export function Use(...middleware: ControllerC[]) {
	return function (target: InjectableC, propertyKey?: string) {
		const meta = MetaAccessor.open(propertyKey? target[propertyKey] : target);
		meta.nested.push(...middleware);
	}
}