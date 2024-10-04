declare class URLPathParams extends Map<string, string> {
  constructor(template: string, path: string);
  toObject(): { [key: string]: string };
}

declare class EnhancedURL extends URL {
  constructor(url: string | URL, base?: string | URL);
  getPathParams(template: string): URLPathParams;
}

export { EnhancedURL, URLPathParams };
