import { Controller } from '../../classes/Controller';
import { Path } from '../../decorators/Path.decorator';
import { Post } from '../../decorators/RequestMethods.decorator';
import { Body, Params } from '../../decorators/RequestParams.decorator';


class BodyModel {
	static schema() {
		return {
			properties: {
				name: {
					type: 'string',
				},
				path: {
					type: 'number'
				}
			}
		}
	}
}

class ParamsModel {
	static schema() {
		return {
			properties: {
				name: {
					type: 'string',
				},
				path: {
					type: 'number'
				}
			}
		}
	}
}

@Path('/swagger')
export class Swagger extends Controller {

	@Post('/swagger')
	get(@Params p: ParamsModel, @Body b: BodyModel) {
		return 'ok';
	}

}