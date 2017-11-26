
import { $, map, newLine } from '../tools';
import { classTpl } from "./class.tpl";

export function classesTpl(enums, classes) {
	return $(function (g) { return `
		import { $Model } from 'model-generator';
		${map(classes, classTpl).join(newLine())}
	`;});
}
