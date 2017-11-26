
import { $ } from '../tools';
import { argTypeTpl } from './arg-type.tpl';
import { argDefTpl } from './arg-def.tpl';

export function argTpl(prop, key: string, definition, omitDefault = false, raw = false) {
	return $(function (g) { return `
		${key}: ${argTypeTpl(prop, key, definition, raw)} ${omitDefault? '' : argDefTpl(prop, key, definition)}
	`});
}