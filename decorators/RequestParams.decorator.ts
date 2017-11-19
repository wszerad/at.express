import { MetaAccessor } from '../utils/MetaAccessor';
import 'reflect-metadata';

export const Session = requestParamCreator('req.session');
export const Cookie = requestParamCreator('req.cookie', true);
export const Params = requestParamCreator('req.params', true);
export const Body = requestParamCreator('req.body', true);
export const Query = requestParamCreator('req.query', true);
export const Error = requestParamCreator('err', null,true);

export function Inject(target: any, propertyKey: string, index: number) {
	const meta = MetaAccessor.open(target[propertyKey]);
	meta.paramsTypes[index] = Reflect.getMetadata("design:paramtypes", target, propertyKey)[index];
	meta.params[index] = "req[Symbol.for(meta.paramsTypes[" + index + "].name)] || (req[Symbol.for(meta.paramsTypes[" + index + "].name)] = new meta.paramsTypes[" + index + "]())";
}

function requestParamCreator(dataSource: string, validate?: boolean, error?: boolean) {
	return function (target, propertyKey, index) {
		const meta = MetaAccessor.open(target[propertyKey]);
		meta.paramsTypes[index] = Reflect.getMetadata("design:paramtypes", target, propertyKey)[index];
		meta.params[index] = dataSource;
		meta.paramsValidate[index] = validate || false;
		meta.error = meta.error || !!error;
	};
}