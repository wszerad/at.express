
import { Schema } from '../model';

export class TypeModel {

	className: string;
	schema: Schema = {};

	constructor(className: string, type: string, originalType?: string) {
		this.className = className;
		this.schema.type = type;
		this.schema.originalType = originalType || type;
	}

	get type(): string {
		return this.schema.type;
	}

	get originalType(): string {
		return this.schema.originalType;
	}

	enum(options: any[]) {
		this.schema.enum = options;
		return this;
	}

	pattern(pattern: RegExp) {
		this.schema.pattern = pattern;
		return this;
	}

	optional() {
		this.schema.required = false;
		return this;
	}

	format(format: string) {
		this.schema.format = format;
		return this;
	}

	default(def: any) {
		this.schema.default = def;
		return this;
	}

}