import { Controller } from '../../classes/Controller';
import { ResponseError } from '../../classes/ResponseError';
import { Path } from '../../decorators/Path.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';
import { Params } from '../../decorators/RequestParams.decorator';

class ParamsData {
	id: number;

	static parse(params) {
		params.id = Number(params.id);

		if(isNaN(params.id)) {
			throw new ResponseError(500, 'inconsistent data')
		}

		return params;
	}
}

@Path('/convert_validate')
export class ConvertValidate extends Controller {

	@Get('/data/:id')
	get(@Params params: ParamsData) {
		return {
			params: params.id,
			paramsType: typeof params.id
		};
	}

}