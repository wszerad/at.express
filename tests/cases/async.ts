import { Controller } from '../../classes/Controller';
import { Path } from '../../decorators/Path.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';

@Path('/async')
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