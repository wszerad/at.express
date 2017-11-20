import { Controller } from '../../classes/Controller';
import { Use } from '../../decorators/Middleware.decorator';
import { Path } from '../../decorators/Path.decorator';
import { Post, Get } from '../../decorators/RequestMethods.decorator';
import { Body, Params } from '../../decorators/RequestParams.decorator';


class BodyModel {
	name: string;
	path: number;
}

class ParamsModel {
	name: string;
	path: number;
}

export const definitions = {
	ParamsModel: {
		properties: {
			name: {
				type: 'string',
			},
			path: {
				type: 'number'
			}
		}
	},
	BodyModel: {
		properties: {
			name: {
				type: 'string',
			},
			path: {
				type: 'number'
			}
		}
	}
};

@Path('/nested/:name/:path')
class NestedSwagger extends Controller {

	@Get('/swagger')
	get(@Params p: ParamsModel) {
		return 'ok';
	}
}

@Use(NestedSwagger)
@Path('/swagger')
export class Swagger extends Controller {

	@Post('/swagger')
	post(@Body b: BodyModel) {
		return 'ok';
	}

}