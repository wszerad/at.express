import { $, enumTitle, map, newLine } from '../tools';
import { enumPropTpl } from './enum-prop.tpl';

export function enumTpl(definition) {
	return $(function (g) { return `
		declare enum ${enumTitle(definition)} {
			${map(definition.schema.enums, enumPropTpl, definition).join(','+newLine())}
		}
	`});
}