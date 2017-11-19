import { Controller } from '../../classes/Controller';
import { Path } from '../../decorators/Path.decorator';
import { Get } from '../../decorators/RequestMethods.decorator';

@Path('/inheritance_parent')
export class InheritanceParent extends Controller {

	value() {
		return 'inheritance_parent';
	}

	@Get('/method1')
	get1() {
		return this.value();
	}

}

@Path('/inheritance')
export class Inheritance extends InheritanceParent {

	value() {
		return 'inheritance';
	}

	@Get('/method2')
	get2() {
		return 'method2';
	}

}

@Path('/inheritance_child')
export class InheritanceChild extends Inheritance {

	value() {
		return 'inheritance_child';
	}

}