import { Controller } from '../../classes/Controller';
import { Middleware } from '../../classes/Middleware';
import { Path } from '../../decorators/Path.decorator';
import { Before } from '../../decorators/Middleware.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';
import { Inject } from '../../decorators/RequestParams.decorator';

class Serv {
	value: string = 't';
	add() {
		this.value += 's';
	}
}

class MiddSet extends Middleware {

	use(@Inject ser: Serv) {
		ser.add();
	}
}

@Path('/services')
export class Services extends Controller {

	@Before(MiddSet)
	@Get('/inject')
	get(@Inject ser: Serv) {
		return ser.value;
	}

}