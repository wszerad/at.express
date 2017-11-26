import * as assert from 'assert';

export function $(fuu) {
	return fuu.call($['scope'], scope).trim();
}

$['scope'] = {};

export function scope(obj) {
	$['scope'] = {...obj};
}

export function map(iterable: any[] | any, fuu, ...args) {
	if (Array.isArray(iterable)) {
		return iterable.map((item, index) => fuu(item, index, ...args)).filter(exist => exist);
	} else {
		if(!iterable) throw new Error();
		return Object.keys(iterable).map(key => fuu(iterable[key], key, ...args)).filter(exist => exist);
	}
}

export function equal(actual: string, expected: string) {
	assert.equal(strip(actual), strip(expected));

	function strip(str: string): string {
		return str.replace(/\t/gim, '').trim();
	}
}

export function newLine() {
	return '\n';
}

export function originalTitle(model) {
	return model.schema.title;
}

export function classTitle(model) {
	const classNameDecorator = $['scope'].classNameDecorator || (title => titleFormatter(title) + 'Model');
	return classNameDecorator(model.schema.title);
}

export function rawTitle(model) {
	const RAWNameDecorator = $['scope'].RAWNameDecorator || (title => titleFormatter(title) + 'RAW');
	return RAWNameDecorator(model.schema.title);
}

export function parsedTitle(model) {
	const nameDecorator = $['scope'].nameDecorator || (title => titleFormatter(title) + '');
	return nameDecorator(model.schema.title);
}

export function enumTitle(model) {
	const enumNameDecorator = $['scope'].enumNameDecorator || (title => titleFormatter(title) + 'Enum');
	return enumNameDecorator(model.schema.title);
}

function titleFormatter(title: string): string {
	return title[0].toUpperCase() + title.slice(1);
}
