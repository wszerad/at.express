
import { $, enumTitle, rawTitle } from '../tools';

export function argTypeTpl(prop, key: string, definition, raw = false) {
	return $(function (g) {
		if(prop.className === 'ArrayModel') {
			if (prop.schema.items) {
				if (prop.schema.items.className === 'ArrayModel') {
					return `${argTypeTpl(prop.schema.items.schema.items, key, definition, raw)}[][]`;
				} else {
					return `${argTypeTpl(prop.schema.items, key, definition, raw)}[]`;
				}
			} else {
				return `any[]`;
			}
		} else if(prop.className === 'EnumModel') {
			return `${enumTitle(prop)}`;
		} else if(raw && prop.className === 'Model') {
			return `${rawTitle(prop)}`;
		} else {
			return `${raw? prop.type : prop.originalType}`;
		}
	});
}
