
import { $, classTitle, map, newLine, originalTitle, parsedTitle, rawTitle } from '../tools';
import { propTpl } from './prop.tpl';
import { argTpl } from './arg.tpl';
import { createDefTpl } from './create-def.tpl';
import { bodyPropTpl } from './body-prop.tpl';

export function classTpl(definition) {
	const properties = definition.schema.properties;

	return $(function (g) { return `
		export class ${classTitle(definition)} {
		
			${map(properties, bodyPropTpl, definition).join(';\n')};
		
			static property(name: string) {
				return $Model.definitions['${originalTitle(definition)}'].schema.properties[name];
			}
		
			static create(${map(properties, argTpl, definition).join(', ')}): ${parsedTitle(definition)} {
				${map(properties, createDefTpl, definition).join('\n')}
				return {${map(properties, (i, key)=>key).join(', ')}};
			}
		
			static parse(raw: ${rawTitle(definition)}): ${parsedTitle(definition)} {
				return {
					${map(properties, propTpl, definition).join(',' + newLine())}
				};
			}
		}
	`;});
}
