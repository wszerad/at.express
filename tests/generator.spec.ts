import { $Object, $Array, $Boolean, $String, $Date, $Enum, $Model, $Number } from '../models/index';
import { equal, scope } from '../templates/tools';
import { classTpl } from '../templates/tpl/class.tpl';
import { propTpl } from '../templates/tpl/prop.tpl';
import { valueTpl } from '../templates/tpl/value.tpl';
import { argTpl } from '../templates/tpl/arg.tpl';
import { createDefTpl } from '../templates/tpl/create-def.tpl';
import { interfaceTpl } from '../templates/tpl/interface.tpl';
import { interfaceRawTpl } from '../templates/tpl/interface-raw.tpl';
import { enumTpl } from '../templates/tpl/enum.tpl';

$Object('Test2', {
	number2: $Number(),
	string2: $String()
});

$Object('Test', {
	enum: $Enum('Enum2', ['one', 'two']),
	simple: $String(),
	array: $Array().default([]),
	number: $Number().default(5),
	string: $String().default('4'),
	date: $Date().default(()=> new Date()),
	test2: $Model.definitions['Test2']
});

scope({
	definitions: $Model.definitions
});

describe('Classes', function() {

	describe('#values', function() {
		const simple = $Number();
		const key = 'type';

		it('type - simple', function() {
			equal(valueTpl(simple, key, $Model.definitions['Test']), `
				raw['type']
			`);
		});

		const date = $Date();

		it('type - date', function() {
			equal(valueTpl(date, key, $Model.definitions['Test']), `
				TestModel.property('type').parse(raw['type'])
			`);
		});

		const arraySimple = $Array().items($String());

		it('type - array - simple', function() {
			equal(valueTpl(arraySimple, key, $Model.definitions['Test']), `
				[...raw['type']]
			`);
		});

		const arrayComplex = $Array().items($Model.definitions['Test']);

		it('type - array - complex', function() {
			equal(valueTpl(arrayComplex, key, $Model.definitions['Test']), `
				raw['type'].map(TestModel.parse)
			`);
		});

		it('type - complex', function() {
			equal(valueTpl($Model.definitions['Test'], key, $Model.definitions['Test']), `
				TestModel.parse(raw['type'])
			`);
		});

		it('type - enum', function() {
			equal(valueTpl($Model.enums['Enum2'], key, $Model.definitions['Test']), `
				raw['type']
			`);
		});

		// TODO
		// const logicSimple = Model.anyOf([Model.String(), Model.Number()]);
		// const logicComplex = Model.anyOf([$Model.definitions['Test'], $Model.definitions['Test2']]);
		// const logicMixed = Model.anyOf([Model.String(), $Model.definitions['Test2']]);
	});

	describe('#props', function() {
		const simple = $Number();
		const key = 'type';

		it('type - simple', function () {
			equal(propTpl(simple, key, $Model.definitions['Test']), `
				type: raw['type']
			`);
		});
	});

	describe('#args', function() {
		const key = 'type';
		const simple = $Number();

		it('arg - simple', function () {
			equal(argTpl(simple, key, $Model.definitions['Test']), `
				type: number
			`);
		});

		const complex = $Model.definitions['Test'];

		it('arg - complex', function () {
			equal(argTpl(complex, key, $Model.definitions['Test']), `
				type: Test
			`);
		});

		const arrayAny = $Array();

		it('arg - array - any', function () {
			equal(argTpl(arrayAny, key, $Model.definitions['Test']), `
				type: any[]
			`);
		});

		const arraySimple = $Array().items($String());

		it('arg - array - simple', function () {
			equal(argTpl(arraySimple, key, $Model.definitions['Test']), `
				type: string[]
			`);
		});

		const arrayComplex = $Array().items($Model.definitions['Test']);

		it('arg - array - complex', function () {
			equal(argTpl(arrayComplex, key, $Model.definitions['Test']), `
				type: Test[]
			`);
		});

		const arrayNestedComplex = $Array().items($Array().items($Model.definitions['Test']));

		it('arg - array - nested - complex', function () {
			equal(argTpl(arrayNestedComplex, key, $Model.definitions['Test']), `
				type: Test[][]
			`);
		});

		const simpleDef = $Number().default(5);

		it('arg - simple - def', function () {
			equal(argTpl(simpleDef, key, $Model.definitions['Test']), `
				type: number = 5
			`);
		});

		const simpleDefFuu = $Number().default(()=>6);

		it('arg - simple - defFuu', function () {
			equal(argTpl(simpleDefFuu, key, $Model.definitions['Test']), `
				type: number
			`);
		});

		it('type - enum', function() {
			equal(argTpl($Model.enums['Enum2'], key, $Model.definitions['Test']), `
				type: Enum2
			`);
		});
	});

	describe('#create', function() {
		const key = 'type';
		const simple = $Date().default(()=>new Date());

		it('default - simple', function () {
			equal(createDefTpl(simple, key, $Model.definitions['Test']), `
				if (type === undefined) type = TestModel.property('type').schema.default();
			`);
		});

	});

	describe('#interface', function() {
		it('0', function() {
			equal(interfaceTpl($Model.definitions['Test']), `
				declare interface Test {
					enum: Enum2;
					simple: string;
					array: any[];
					number: number;
					string: string;
					date: Date;
					test2: Test2;
				}
			`);
		});
	});

	describe('#interface - raw', function() {
		it('0', function() {
			equal(interfaceRawTpl($Model.definitions['Test']), `
				declare interface TestRAW {
					enum: number;
					simple: string;
					array: any[];
					number: number;
					string: string;
					date: string;
					test2: Test2RAW;
				}
			`);
		});
	});

	describe('#enum', function() {
		it('0', function() {
			const enums = $Enum('Enum', {
				TEST: 'test',
				TEST_ONE: 'test-one'
			});

			equal(enumTpl(enums), `
				export enum EnumEnum {
					TEST = 'test',
					TEST_ONE = 'test-one'
				}
			`);
		});
	});

	describe('#classes', function() {
		it('0', function() {
			equal(classTpl($Model.definitions['Test']), `
				export class TestModel {
					
					enum: Enum2;
					simple: string;
					array: any[] = [];
					number: number = 5;
					string: string = '4';
					date: Date = TestModel.property('date').schema.default();
					test2: Test2;
					
					static property(name: string) {
						return $Model.definitions['Test'].schema.properties[name];
					}
		
					static create(enum: Enum2, simple: string, array: any[] = [], number: number = 5, string: string = '4', date: Date, test2: Test2): Test {
						if (date === undefined) date = TestModel.property('date').schema.default();
						return {enum, simple, array, number, string, date, test2};
					}
		
					static parse(raw: TestRAW): Test {
						return {
							enum: raw['enum'],
							simple: raw['simple'],
							array: [...raw['array']],
							number: raw['number'],
							string: raw['string'],
							date: TestModel.property('date').parse(raw['date']),
							test2: Test2Model.parse(raw['test2'])
						};
					}
				}
			`);
		});
	});

});
