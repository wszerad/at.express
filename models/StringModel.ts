
import { DefaultCreator } from '../model';
import { TypeModel } from './TypeModel';

export class StringModel extends TypeModel {

	constructor() {
		super('StringModel', 'string');
	}

	max(max: number) {
		this.schema.maxLength = max;
		return this;
	}

	min(min: number) {
		this.schema.minLength = min;
		return this;
	}

	default(def: string | DefaultCreator<string>) {
		this.schema.default = def;
		return this;
	}
}