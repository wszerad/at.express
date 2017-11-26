
import { $, classTitle } from '../tools';

export function createDefTpl(prop, key, definition) {
	return $(function (g) {
		if (typeof prop.schema.default === 'function') {
			return `if (${key} === undefined) ${key} = ${classTitle(definition)}.property('${key}').schema.default();`;
		} else {
			return '';
		}
	});
}
