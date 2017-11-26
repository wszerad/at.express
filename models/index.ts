import { AnyModel, Model as ModelModel, Properties } from './Model';
import { ArrayModel } from './ArrayModel';
import { BooleanModel } from './BooleanModel';
import { DateModel } from './DateModel';
import { NumberModel } from './NumberModel';
import { StringModel } from './StringModel';
import { EnumMap, EnumModel } from './EnumModel';

export const $Model = ModelModel;

export function $String() {
	return new StringModel();
}

export function $Number() {
	return new NumberModel();
}

export function $Date() {
	return new DateModel();
}

export function $Boolean() {
	return new BooleanModel();
}

export function $Array(items?: AnyModel) {
	return new ArrayModel().items(items);
}

export function $Enum(title: string, enums: EnumMap) {
	return new EnumModel(title, enums);
}

export function $Object(title: string, object: Properties) {
	return new ModelModel(title, object);
}
