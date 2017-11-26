
import { $, classTitle } from '../tools';

export function valueTpl(prop, key: string, definition) {
	return $(function (g) {
		if (prop.className === 'ArrayModel') {
			if (prop.schema.items && prop.schema.items.className === 'Model') {
				return `raw['${key}'].map(${classTitle(prop.schema.items)}.parse)`;
			} else {
				return `[...raw['${key}']]`;
			}
		} else if(prop.className === 'Model') {
			return `${classTitle(prop)}.parse(raw['${key}'])`;
		} else if(prop.schema.items) {
			return `${classTitle(prop.schema.items)}.parse(raw['${key}'])`;
		} else if('parse' in prop) {
			return `${classTitle(definition)}.property('${key}').parse(raw['${key}'])`;
		} else {
			return `raw['${key}']`;
		}
	});
}
