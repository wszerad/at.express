
import { DefaultCreator } from '../model';
import { TypeModel } from './TypeModel';

export class DateModel extends TypeModel {

	constructor() {
		super('DateModel', 'string', 'Date');
	}

	max(max: number) {
		this.schema.maximum = max;
		return this;
	}

	min(min: number) {
		this.schema.minimum = min;
		return this;
	}

	multipleOf(multipleOf: number) {
		this.schema.multipleOf = multipleOf;
		return this;
	}

	range(min: number, max: number, multipleOf: number = 1) {
		return this.min(min).max(max).multipleOf(multipleOf);
	}

	default(def: DefaultCreator<Date>) {
		this.schema.default = def;
		return this;
	}

	parse(self: any) {
		return new Date(self);
	}
}