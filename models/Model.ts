
import { NumberModel } from './NumberModel';
import { DateModel } from './DateModel';
import { ArrayModel } from './ArrayModel';
import { BooleanModel } from './BooleanModel';
import { StringModel } from './StringModel';
import { LogicModel } from './LogicModel';
import { TypeModel } from './TypeModel';
import { EnumModel } from './EnumModel';

export class Model extends TypeModel {

	constructor(title: string, object: Properties) {
		super('Model', 'object', title);

		if (title in Model.definitions) {
			throw new Error('Model duplicate!');
		}

		this.schema.title = title;
		this.schema.properties = object;
		this.schema.additionalProperties = false;

		Model.definitions[title] = this;
	}

	static anyOf(items: AnyModel[]) {
		return new LogicModel('anyOf', items);
	}

	static oneOf(items: AnyModel[]) {
		return new LogicModel('oneOf', items);
	}

	static allOf(items: AnyModel[]) {
		return new LogicModel('allOf', items);
	}

	static not(item: AnyModel) {
		return new LogicModel('not', item);
	}

	static definitions: {[key: string]: Model} = {};
	static enums: {[key: string]: EnumModel} = {};
	static run(command: any | any[], force: boolean = false) {
		if (force) {
			[].concat(command).forEach(command => {
				command();
			})
		}
	}
}

export interface Properties {
	[key: string]: AnyModel
}

export declare type AnyModel = Model | NumberModel | StringModel | BooleanModel | ArrayModel | DateModel | LogicModel;
