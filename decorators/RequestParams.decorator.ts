import { ControllerC } from '../model';
import { MetaAccessor } from '../utils/MetaAccessor';
import 'reflect-metadata';

export const Session = requestParamCreator('req.session');
export const Cookie = requestParamCreator('req.cookie');
export const Params = requestParamCreator('req.params');
export const Body = requestParamCreator('req.body');
export const Query = requestParamCreator('req.query');
export const Error = requestParamCreator('err', true);

export function Inject(target: ControllerC, propertyKey: string, index: number) {
	const meta = MetaAccessor.open(target[propertyKey]);
	meta.paramsTypes[index] = Reflect.getMetadata("design:paramtypes", target, propertyKey)[index];
	meta.params[index] = "req[Symbol.for(meta.paramsTypes[" + index + "].name)] || (req[Symbol.for(meta.paramsTypes[" + index + "].name)] = new meta.paramsTypes[" + index + "]())";
}

function requestParamCreator(dataSource: string, error?: boolean) {
	return function (target, propertyKey, index) {
		const meta = MetaAccessor.open(target[propertyKey]);
		meta.paramsTypes[index] = Reflect.getMetadata("design:paramtypes", target, propertyKey)[index];
		meta.params[index] = dataSource;
		meta.error = meta.error || !!error;
	};
}