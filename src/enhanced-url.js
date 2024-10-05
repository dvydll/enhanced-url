'use strict'

import { URLPathParams } from "./url-path-params.js";

export class EnhancedURL extends URL {
	#pathParams;

	/**
	 *
	 * @param {string | URL} url
	 * @param {string | URL} [base]
	 */
	constructor(url, base) {
		super(url, base);
	}

	/**
	 * Método para obtener los path parameters como un Map
	 * @param {string} template
	 * @returns {URLPathParams}
	 */
	getPathParams(template) {
		if (!this.#pathParams)
			this.#pathParams = new URLPathParams(template, this.pathname);

		return this.#pathParams;
	}
}