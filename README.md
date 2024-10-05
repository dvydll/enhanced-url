# EnhancedURL

**EnhancedURL** es una extensión sencilla del objeto `URL` nativo de JavaScript que facilita la gestión de _path parameters_ en las rutas. Con esta biblioteca, puedes extraer y manipular parámetros de forma intuitiva, mejorando así la legibilidad y mantenibilidad de tu código.

## Características

- **Extensión del objeto URL**: Añade funcionalidades adicionales al objeto `URL` nativo.
- **Objeto URLPathParams**: Implementa el objeto `URLPathParams` heredando del objeto `Map<string, string>` inspirado en el objeto nativo `URLSearchParams`, permitiendo extraer y manipular parámetros de ruta a partir de una plantilla.
- **Manejo de path parameters**: Extrae parámetros de ruta de manera sencilla usando plantillas.
- **Inmutabilidad**: Los parámetros son inmutables desde el exterior, protegiendo la integridad de tus datos.
- **Compatibilidad con ECMAScript Modules**: Utiliza la sintaxis estándar de módulos de JavaScript.

## Instalación

Puedes instalar el paquete a través de npm:

```bash
npm install enhanced-url
```

## Uso

### Crear una instancia de EnhancedURL

```javascript
import { EnhancedURL } from 'enhanced-url';

const url = new EnhancedURL('https://pokeapi.co/api/v2/pokemon/ditto');
```

### Obtener parámetros de ruta

```javascript
const template = '/api/:apiVersion/pokemon/:name';
const params = url.getPathParams(template);

console.log(params.toObject()); // { apiVersion: 'v2', name: 'ditto' }
```

## Estructura del proyecto

```
64.0 KiB  enhanced-url/
 4.0 KiB    ├── README.md
 4.0 KiB    ├── LICENSE
 4.0 KiB    ├── index.d.ts
36.0 KiB    ├── package-lock.json
 4.0 KiB    ├── package.json
12.0 KiB    ├── src/
 4.0 KiB    │   ├── enhanced-url.js
 4.0 KiB    │   ├── index.js
 4.0 KiB    │   └── url-path-params.js
 8.0 KiB    └── tests/
 4.0 KiB        ├── enhanced-url.test.js
 4.0 KiB        └── url-path-params.test.js

2 directories, 10 files
```

## Pruebas

Para ejecutar las pruebas incluidas, asegúrate de tener _Vitest_ instalado y luego ejecuta:

```bash
npm run test
```

## Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de abrir un _issue_ o enviar un _pull request_.

## Licencia

Este proyecto está bajo la [MIT License](https://opensource.org/licenses/MIT).