
import { $, classTitle } from '../tools';

export function argDefTpl(prop, key: string, definition, force = false) {
	return $(function (g) {
		if (prop.schema.default !== undefined && typeof prop.schema.default !== 'function') {
			return `= ${JSON.stringify(prop.schema.default).replace(/\"/gi, "'")}`;
		} else if (force && typeof prop.schema.default === 'function') {
			return `= ${classTitle(definition)}.property('${key}').schema.default()`;
		} else {
			return '';
		}
	});
}
