
import { AnyModel } from './Model';
import { TypeModel } from './TypeModel';

export class LogicModel extends TypeModel {

	constructor(key: string, items: AnyModel | AnyModel[]) {
		super('LogicModel', '');

		this.schema.key = key;
		this.schema.items = items;
	}

	get type(): string {
		return [].concat(this.schema.items).map(item => item.type).join(' | ');
	}

	get originalType(): string {
		return [].concat(this.schema.items).map(item => item.originalType).join(' | ');
	}

}