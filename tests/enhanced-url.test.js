import { describe, expect, test } from 'vitest';
import { EnhancedURL } from '../src/index.js';

describe('EnhancedURL', () => {
	test('debe extraer path parameters correctamente según la plantilla', () => {
		const url = new EnhancedURL('https://example.com/api/v1/pokemon/42');
		const template = '/api/:version/pokemon/:id';
		const params = url.getPathParams(template);
    expect(params.get('version')).toBe('v1');
    expect(params.get('id')).toBe('42');

		const paramsObject = params.toObject();
		expect(paramsObject).toEqual({
			version: 'v1',
			id: '42',
		});
	});

	test('debe devolver el mismo objeto URLPathParams en llamadas consecutivas', () => {
		const url = new EnhancedURL('https://example.com/api/v1/pokemon/42');
		const template = '/api/:version/pokemon/:id';
		const params1 = url.getPathParams(template);
		const params2 = url.getPathParams(template);

		expect(params1).toBe(params2); // Deberían ser el mismo objeto
	});

	test('debe manejar rutas que no coinciden con la plantilla', () => {
		const url = new EnhancedURL('https://example.com/not/matching/path');
		const template = '/api/:version/pokemon/:id';
		const params = url.getPathParams(template);

		expect(params.size).toBe(0); // No debe haber parámetros
	});
});
