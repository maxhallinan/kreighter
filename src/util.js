export const entries = obj =>
  Object.keys(obj)
    .reduce((es, k) => [ ...es, [ k, (obj[k]), ], ], []);

export const isArray = x => typeOf(x) === `array`;

export const isFunction = x => typeOf(x) === `function`;

export const isObject = x => typeOf(x) === `object`;

export const isUndefined = x => typeOf(x) === `undefined`;

export const typeOf = x  =>
  ({}).toString
    .call(x)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
