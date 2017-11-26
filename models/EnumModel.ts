
import { TypeModel } from './TypeModel';
import { Model } from './Model';

export class EnumModel extends TypeModel {

	constructor(title: string, enums: EnumMap) {
		let type = 'number';
		let properties;

		if (Array.isArray(enums)) {
			properties = enums.reduce((props, item, index) => {
				props[item] = index;
				return props;
			}, {})
		} else {
			if (typeof enums[Object.keys(enums)[0]] === 'string') {
				type = 'string';
			}

			properties = enums;
		}

		super('EnumModel', type, title);

		if (title in Model.enums) {
			throw new Error('Enum duplicate!');
		}

		this.schema.title = title;
		this.schema.enums = properties;

		for(let key in properties) {
			this[key] = properties[key];
		}

		Model.enums[title] = this;
	}

}

export type EnumMap = string[] | {[key: string]: string} | {[key: string]: number};