import { Controller } from '../classes/Controller';
import { Include } from '../decorators/Include.decorator';
import { Get } from '../decorators/RequestMethods.decorator';

@Include('/async')
export class Async extends Controller {

	@Get('/async')
	async get(): Promise<string> {
		return new Promise<string>((resolve) => {
			setTimeout(() => {
				resolve('async');
			}, 100);
		});
	}

}