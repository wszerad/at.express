
import { $ } from '../tools';
import { argTypeTpl } from './arg-type.tpl';
import { argDefTpl } from './arg-def.tpl';

export function bodyPropTpl(prop, key: string, definition) {
	return $(function (g) { return `
		${key}: ${argTypeTpl(prop, key, definition)} ${argDefTpl(prop, key, definition, true)}
	`});
}