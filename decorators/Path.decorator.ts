import { ControllerC } from '../model';
import { MetaAccessor } from '../utils/MetaAccessor';

export function Path(path?: string) {
	return function (constructor: ControllerC) {
		const meta = MetaAccessor.open(constructor);

		meta.path = path;
	}
}