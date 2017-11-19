import * as express from 'express';
import { ControllerC } from '../model';
import { RequestWrapper } from '../utils/RequestWrapper';
import { MetaAccessor, MetadataObject } from '../utils/MetaAccessor';
import { Injector } from '../utils/Injector';
import { SchemaStore } from '../utils/SchemaStore';

export class Controller {
	static router(app) {
		const controller = this;
		const cMeta = MetaAccessor.get(controller);
		app.use(cMeta.path, this.createRouter());
	};

	static createRouter() {
		const controller = this;
		const instance = Injector.get(<ControllerC>this);
		const cMeta = MetaAccessor.get(controller);
		const router = express.Router({mergeParams: true});

		let methods = [];
		let cls = controller;

		do {
			methods = methods.concat(Object.getOwnPropertyNames(cls.prototype));
		} while (Object.getPrototypeOf(cls).name && (cls = Object.getPrototypeOf(cls.prototype).constructor));

		cMeta.nested.forEach((controller) => {
			const nMeta = MetaAccessor.get(controller);

			router.use(nMeta.path, ...[
				...nMeta.before.map(midd => Injector.middlewareExecutor(midd)),
				controller.createRouter(),
				...nMeta.after.map(midd => Injector.middlewareExecutor(midd))
			]);
		});

		cMeta.before.forEach(midd => {
			router.use(Injector.middlewareExecutor(midd));
		});

		methods
			.map(name => ({
				name: name,
				method: instance[name],
				meta: MetaAccessor.get(instance[name])
			}) as Endpoint)
			.filter(method => !!method.meta && method.name !== 'constructor')
			.forEach(({name, method, meta}) => {

				if (meta.nested.length) {
					meta.nested.forEach(function (controller) {
						const nMeta = MetaAccessor.get(controller);

						router.use(nMeta.path, ...[
							...meta.before.map(midd => Injector.middlewareExecutor(midd)),
							controller.createRouter(),
							...meta.after.map(midd => Injector.middlewareExecutor(midd))
						])

					});
				} else {
					SchemaStore.addMethod(controller, name);
					router[meta.methodType](meta.path, ...[
						...meta.before.map(midd => Injector.middlewareExecutor(midd)),
						RequestWrapper.create(instance, method, meta),
						...meta.after.map(midd => Injector.middlewareExecutor(midd)),
					]);
				}

			});

		cMeta.after.forEach(midd => {
			router.use(Injector.middlewareExecutor(midd));
		});

		return router;
	}
}

interface Endpoint {
	name: string;
	method: Function;
	meta: MetadataObject;
}