import { $ } from '../tools';

export function enumPropTpl(prop, key, definition) {
	return $(function (g) { return `
		${key} = ${definition.type === 'number'? prop : `'${prop}'`}
	`});
}