import { $, map, newLine, rawTitle } from '../tools';
import { argTpl } from './arg.tpl';

export function interfaceRawTpl(definition) {
	return $(function (g) { return `
		declare interface ${rawTitle(definition)} {
			${map(definition.schema.properties, argTpl, definition, true, true).join(';'+newLine())};
		}
	`});
}