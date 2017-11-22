import { Injector } from '../utils/Injector';
import { MetaAccessor } from '../utils/MetaAccessor';

export abstract class Middleware {
	abstract use(...args: any[]);

	static router(app) {
		const instance = Injector.get(this)
		MetaAccessor.open(this);
		MetaAccessor.open((<Middleware>instance).use);
		app.use(Injector.middlewareExecutor(this));
	}
}