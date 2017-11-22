import { Controller } from '../../classes/Controller';
import { ResponseError } from '../../classes/ResponseError';
import { Path } from '../../decorators/Path.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';

@Path('/errors')
export class Errors extends Controller {

	@Get('/error')
	error() {
		throw new ResponseError(501, 'advanced error', {meta: 7});
	}

	@Get('/error/:params')
	get() {
		throw new ResponseError(501, 'advanced error', {meta: 7});
	}

	@Get('/redirect')
	red() {
		return 'redirected';
	}

}