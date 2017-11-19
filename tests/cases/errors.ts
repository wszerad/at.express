import { Controller } from '../../classes/Controller';
import { ResponseError } from '../../classes/ResponseError';
import { Path } from '../../decorators/Path.decorator';
import { After } from '../../decorators/Middleware.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';
import { ErrorMiddleware } from '../../predefined/Error.middleware';

@After(ErrorMiddleware)
@Path('/errors')
export class Errors extends Controller {

	@Get('/error/:params')
	get() {
		throw new ResponseError(501, 'advanced error', {meta: 7});
	}

	@Get('/redirect')
	red() {
		return 'redirected';
	}

}