export const compose = (a, b) => x => a(b(x));

export const entries = obj =>
  Object
    .keys(obj)
    .reduce((es, k) => [ ...es, [ k, (obj[k]), ], ], []);

export const identity = x => x;

export const includes = (x, arr) => arr.indexOf(x) > -1;

export const invert = x => !x;

export const isArray = x => typeOf(x) === `array`;

export const isFunction = x => typeOf(x) === `function`;

export const isObject = x => typeOf(x) === `object`;

export const isString = x => typeOf(x) === `string`;

export const isOneOfTypes = (types, x) => includes(typeOf(x), types);

export const isUndefined = x => typeOf(x) === `undefined`;

export const map = fn => xs => xs.map(fn);

export const reduce = fn => v => xs => xs.reduce(fn, v);

export const typeOf = x  => (
  ({}).toString
    .call(x)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase()
);

