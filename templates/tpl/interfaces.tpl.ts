import { $, map, newLine } from '../tools';
import { interfaceTpl } from './interface.tpl';
import { interfaceRawTpl } from './interface-raw.tpl';
import { enumTpl } from './enum.tpl';

export function interfacesTpl(definitions, enums) {
	return $(function (g) {

		return map(definitions, (def) => {
				return [interfaceTpl(def), interfaceRawTpl(def)];
			})
			.reduce((list, item) => {
				return list.concat(item);
			}, [...map(enums, enumTpl)])
			.join(newLine()+newLine());
	});
}