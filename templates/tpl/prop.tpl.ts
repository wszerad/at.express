
import { $ } from '../tools';
import { valueTpl } from './value.tpl';

export function propTpl(prop, key: string, definition) {
	return $(function (g) { return `
		${key}: ${valueTpl(prop, key, definition)}
	`});
}
