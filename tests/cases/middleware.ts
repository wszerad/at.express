import { Controller } from '../../classes/Controller';
import { Middleware } from '../../classes/Middleware';
import { Path } from '../../decorators/Path.decorator';
import { After, Before } from '../../decorators/Middleware.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';

const hiddenData = Symbol();

class MiddSend extends Middleware {
	use(req) {
		return 'send';
	}
}

class Midd extends Middleware {
	value: string = 'a';

	use(req) {
		req[hiddenData] = (req[hiddenData] || '');
		req[hiddenData] += this.value;
	}
}

class MiddA extends Midd {

	value = 'A';

}

class MiddB extends Midd {

	value = 'B';

}

class MiddC extends Midd {

	value = 'C';

}

@Path('/middleware_raw')
export class MiddlewareNested extends Controller {

	@Before(MiddB)
	@Get('/method')
	get(req, res) {
		return req[hiddenData];
	}

	@After(MiddSend)
	@Get('/send')
	send(){}
}

@Before(MiddA)
@Path('/middleware')
export class MiddlewareController extends Controller {

	@Before(MiddC)
	@Get('/both')
	get1(req, res) {
		return req[hiddenData];
	}

	@Get('/controller')
	get2(req, res) {
		return req[hiddenData];
	}

}

@Path('/middleware_extended')
export class MiddlewareExtended extends MiddlewareController {}