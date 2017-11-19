import { Controller } from '../classes/Controller';
import { Include } from '../decorators/Include.decorator';
import { Post } from '../decorators/RequestMethods.decorator';
import { Body, Params, Query } from '../decorators/RequestParams.decorator';

@Include('/arguments')
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