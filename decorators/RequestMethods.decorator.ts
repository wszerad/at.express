import { MetaAccessor, MethodTypes } from '../utils/MetaAccessor';

export const Get = requestMethodCreator.bind(null, MethodTypes.GET);
export const Post = requestMethodCreator.bind(null, MethodTypes.POST);
export const Delete = requestMethodCreator.bind(null, MethodTypes.DELETE);
export const Head = requestMethodCreator.bind(null, MethodTypes.HEAD);
export const Put = requestMethodCreator.bind(null, MethodTypes.PUT);
export const All = requestMethodCreator.bind(null, MethodTypes.ALL);

function requestMethodCreator(methodType: MethodTypes, path: string) {
	return function (target, propertyKey) {
		const meta = MetaAccessor.open(target[propertyKey]);
		meta.path = path;
		meta.methodType = methodType;
	};
}