import { Controller } from '../../classes/Controller';
import { Path } from '../../decorators/Path.decorator';
import { Post } from '../../decorators/RequestMethods.decorator';
import { Body, Params, Query } from '../../decorators/RequestParams.decorator';

@Path('/arguments')
export class Arguments extends Controller {

	@Post('/arguments/:params')
	post(@Params params, @Body body, @Query query) {
		return {
			params,
			body,
			query
		};
	}

}