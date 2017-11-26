
import { DefaultCreator } from '../model';
import { TypeModel } from './TypeModel';
import { AnyModel } from './Model';

export class ArrayModel extends TypeModel {

	constructor() {
		super('ArrayModel', 'array');
	}

	get type(): string {
		return [].concat(this.schema.items).map(item => item.originalType).join(' | ');
	}

	get originalType(): string {
		return [].concat(this.schema.items).map(item => item.originalType).join(' | ');
	}

	min(min: number) {
		this.schema.minItems = min;
		return this;
	}

	max(max: number) {
		this.schema.maxItems = max;
		return this;
	}

	uniq(uniq: boolean) {
		this.schema.uniqueItems = uniq;
		return this;
	}

	items(item: AnyModel) {
		this.schema.items = item;
		return this;
	}

	default(def: any[] | DefaultCreator<any[]>) {
		this.schema.default = def;
		return this;
	}
}