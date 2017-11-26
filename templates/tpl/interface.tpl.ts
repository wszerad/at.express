import { $, map, newLine, parsedTitle } from '../tools';
import { argTpl } from './arg.tpl';

export function interfaceTpl(definition) {
	return $(function (g) { return `
		declare interface ${parsedTitle(definition)} {
			${map(definition.schema.properties, argTpl, definition, true).join(';'+newLine())};
		}
	`});
}