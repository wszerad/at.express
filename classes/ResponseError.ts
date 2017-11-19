import { STATUS_CODES } from 'http';

export class ResponseError extends Error {
	status: number;
	model: any;

	constructor(status: number, message: string = '', model: any = {}) {
		super(message || STATUS_CODES[status]);

		this.name = 'ResponseError';
		this.status = status;
		this.model = model;
		this.stack = (new Error(this.message)).stack;
	}

}