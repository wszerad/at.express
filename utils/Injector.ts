import { RequestWrapper } from './RequestWrapper';
import { MetaAccessor } from './MetaAccessor';
import { InjectableC, InjectableI, MiddlewareC } from '../model';
import { Middleware } from '../classes/Middleware';

class InjectorConstructor {

	private middlewareCache: Map<MiddlewareC, Function> = new Map();
	private services: Map<InjectableC, InjectableI> = new Map();

	get(target: InjectableC): InjectableI {
		if(this.services.has(target)) {
			return this.services.get(target);
		} else {
			const record = new (<any>target)();
			this.services.set(target, record);
			return record;
		}
	}

	has(target: InjectableC): boolean {
		return this.services.has(target);
	}

	middlewareExecutor(target: MiddlewareC) {
		if(this.middlewareCache.has(target)) {
			return this.middlewareCache.get(target);
		} else {
			const instance = <Middleware>Injector.get(target);

			const meta = MetaAccessor.merge(target, instance.use);
			const middleware = RequestWrapper.create(instance, instance.use, meta);

			this.middlewareCache.set(target, middleware);
			return middleware;
		}
	}
}

export const Injector = new InjectorConstructor();