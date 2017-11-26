
import { $Model } from '../models/index';
import { classesTpl } from './tpl/classes.tpl';
import { interfacesTpl } from './tpl/interfaces.tpl';
import { processString } from 'typescript-formatter/lib';
import config from './config';
import * as path from 'path';
import * as fs from 'fs';

function generateClasses() {
	return beautify(classesTpl($Model.enums, $Model.definitions));
}

function generateInterfaces() {
	return beautify(interfacesTpl($Model.definitions, $Model.enums));
}

function beautify(content: string): Promise<string> {
	return processString('file.ts', content, {
		replace: false,
		verify: false,
		tsconfig: false,
		tsconfigFile: null,
		tslint: false,
		tslintFile: null,
		editorconfig: false,
		vscode: false,
		tsfmt: true,
		tsfmtFile: JSON.stringify(config)
	}).then(content => {
		return content.dest;
	});
}

export class Definitions {
	static generateClasses(): Promise<string> {
		return beautify(classesTpl($Model.enums, $Model.definitions));
	}

	static generateInterfaces(): Promise<string> {
		return beautify(interfacesTpl($Model.definitions, $Model.enums));
	}

	static async run(): Promise<boolean> {
		const parsedPath = path.parse(process.argv[1]);

		fs.writeFileSync(`${parsedPath.dir}/${parsedPath.name}.def.d.ts`, await generateInterfaces());
		fs.writeFileSync(`${parsedPath.dir}/${parsedPath.name}.def.ts`, await generateClasses());

		return Promise.resolve(true);
	}
}
