import { Controller } from '../classes/Controller';
import { Include } from '../decorators/Include.decorator';
import { All, Delete, Get, Head, Post, Put } from '../decorators/RequestMethods.decorator';

@Include('/methods')
export class Methods extends Controller {

	@Get('/get')
	get() {
		return 'get';
	}

	@Post('/post')
	post() {
		return 'post';
	}

	@Put('/put')
	put() {
		return 'put';
	}

	@Delete('/delete')
	delete() {
		return 'delete';
	}

	@Head('/head')
	head() {
		return 'head';
	}

	@All('/all')
	all() {
		return 'all';
	}

}