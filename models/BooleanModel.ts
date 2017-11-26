
import { DefaultCreator } from '../model';
import { TypeModel } from './TypeModel';

export class BooleanModel extends TypeModel {

	constructor() {
		super('BooleanModel', 'boolean');
	}

	default(def: boolean | DefaultCreator<boolean>) {
		this.schema.default = def;
		return this;
	}
}