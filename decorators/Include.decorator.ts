import { Controller } from '../classes/Controller';
import { Middleware } from '../classes/Middleware';
import { Injector } from '../utils/Injector';
import { MetaAccessor } from '../utils/MetaAccessor';

export function Include(path?: string) {
	return function (constructor: any) {
		const target = Injector.get(constructor);

		if(target instanceof Controller) {
			const meta = MetaAccessor.open(constructor);

			meta.path = path;

		} else if(<Middleware>target instanceof Middleware) {
			MetaAccessor.open(constructor);
			MetaAccessor.open((<Middleware>target).use);
		}
	}
}