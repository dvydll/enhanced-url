/**
 * @extends {Map<string,string>}
 */
export class URLPathParams extends Map {
	/**
	 *
	 * @param {string} template
	 * @param {string} path
	 */
	constructor(template, path) {
		super();
		this.#extractParams(template, path);
	}

	/**
	 * Método para extraer parámetros de la ruta
	 * @param {string} template
	 * @param {string} path
	 * @returns {void}
	 * @private
	 * @method
	 * @memberof URLPathParams
	 * @instance
	 */
	#extractParams(template, path) {
		// Reemplazamos los placeholders incluyendo los opcionales
		const pathRegex = template.replace(
			/:[^\/()]+|\{[^\/()]+\}|\<[^\/()]+\>|\([^()]+\)/g,
			(match) => {
				if (match.startsWith('(') && match.endsWith(')')) {
					// Opcionales: hacemos que la parte dentro de los paréntesis sea opcional
					return `(?:${match
						.slice(1, -1)
						.replace(/:[^\/]+|\{[^\/]+\}|\<[^\/]+\>/g, '([^/]+)')}|)`;
				}
				// No opcionales: reemplazamos los placeholders por grupos de captura
				return '([^/]+)';
			}
		);

		// Creamos el regex dinámico basado en la plantilla
		const regex = new RegExp(`^${pathRegex}$`);
		const match = path.match(regex);

		if (!match) return;

		// Extraemos los nombres de los parámetros, limpiando los caracteres no deseados y gestionando opcionales
		const paramNames = [
			...template.matchAll(/:([^\/()]+)|\{([^\/()]+)\}|\<([^\/()]+)\>/g),
		].map((match) => match[1] || match[2] || match[3]);

		// Asignamos los valores decodificados a los nombres de los parámetros
		paramNames.forEach((name, index) => {
			if (match[index + 1] !== undefined) {
				this.set(name, decodeURIComponent(match[index + 1]));
			}
		});
	}

	/**
	 * Método para convertir a un objeto plano
	 * @returns {{[key:string]:string}}
	 */
	toObject() {
		return Object.fromEntries(this.entries());
	}

	set(key, value) {
		throw new Error('No se puede modificar el objeto URLPathParams');
	}

	append(key, value) {
		throw new Error('No se puede modificar el objeto URLPathParams');
	}

	delete(key) {
		throw new Error('No se puede modificar el objeto URLPathParams');
	}
}

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
