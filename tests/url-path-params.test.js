import { describe, expect, test } from 'vitest';
import { URLPathParams } from '../src/index.js';

describe('URLPathParams', () => {
	test('Extrae parámetros no opcionales correctamente', () => {
		const template = '/api/:version/pokemon/:id';
		const path = '/api/v2/pokemon/123';
		const params = new URLPathParams(template, path);
		expect(params.toObject()).toEqual({ version: 'v2', id: '123' });
	});

	test('Extrae parámetros opcionales correctamente', () => {
		const template = '/api/:version(/users/:userId)';
		const path = '/api/v2';
		const params = new URLPathParams(template, path);
		expect(params.toObject()).toEqual({ version: 'v2' });
		expect(params.get('version')).toBe('v2');

		const pathWithOptional = '/api/v2/users/42';
		const paramsWithOptional = new URLPathParams(template, pathWithOptional);
		expect(paramsWithOptional.toObject()).toEqual({
			version: 'v2',
			userId: '42',
		});
		expect(paramsWithOptional.get('version')).toBe('v2');
		expect(paramsWithOptional.get('userId')).toBe('42');
	});

	test('No modifica el objeto URLPathParams', () => {
		const template = '/api/:version/pokemon/:id';
		const path = '/api/v2/pokemon/123';
		const params = new URLPathParams(template, path);
		expect(() => params.set('key', 'value')).toThrow(Error);
		expect(() => params.append('key', 'value')).toThrow(Error);
		expect(() => params.delete('version')).toThrow(Error);
		expect(() => params.clear()).toThrow(Error);
	});
});
