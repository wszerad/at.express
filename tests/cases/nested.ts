import { Controller } from '../../classes/Controller';
import { Middleware } from '../../classes/Middleware';
import { Path } from '../../decorators/Path.decorator';
import { Before, Use } from '../../decorators/Middleware.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';
import { Inject } from '../../decorators/RequestParams.decorator';

class Serv {
	value: string = '';
	set(val) {
		this.value += val;
	}
}

@Path('/nested')
class Nested extends Controller {

	@Get('/end')
	get(@Inject ser: Serv) {
		return ser.value;
	}

}

class Midd extends Middleware {
	use(@Inject ser: Serv) {
		ser.set('A');
	}
}

@Before(Midd)
@Use(Nested)
@Path('/nested1')
export class Nested1 extends Controller {}

@Before(Midd)
@Path('/nested2')
export class Nested2 extends Controller {

	@Before(Midd)
	@Use(Nested)
	use() {}

}