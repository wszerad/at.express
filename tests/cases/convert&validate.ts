import { Controller } from '../../classes/Controller';
import { Middleware } from '../../classes/Middleware';
import { ResponseError } from '../../classes/ResponseError';
import { Before } from '../../decorators/Middleware.decorator';
import { Path } from '../../decorators/Path.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';
import { Params } from '../../decorators/RequestParams.decorator';

class ParamsData {
	id: number;

	static parse(params) {
		const id = Number(params.id);

		if(isNaN(params.id)) {
			throw new ResponseError(500, 'inconsistent data')
		}

		return {
			id
		};
	}
}

class ParamsData2 {
	uuid: string;
	id?: number;

	static parse(params) {
		console.log(params);

		return {
			uuid: String(params.id)
		};
	}
}

class Converter extends Middleware {
	use(@Params params2: ParamsData2) {
		params2.id = Number(params2.uuid);
	}
}

@Path('/convert_validate')
export class ConvertValidate extends Controller {

	@Before(Converter)
	@Get('/converter/:id')
	converter(@Params params: ParamsData, @Params params2: ParamsData2) {
		return {
			params: params.id,
			paramsType: typeof params.id,
			params2: params2.uuid,
			params2Type: typeof params2.uuid,
			params2Id: params2.id,
			params2TypeId: typeof params2.id
		};
	}

	@Get('/data/:id')
	get(@Params params: ParamsData, @Params params2: ParamsData2) {
		return {
			params: params.id,
			paramsType: typeof params.id,
			params2: params2.uuid,
			params2Type: typeof params2.uuid,
			params2Id: params2.id,
			params2TypeId: typeof params2.id
		};
	}

}