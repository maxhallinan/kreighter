import { isFunction, } from './util';

const fromFn = (type, withFields) => (values) => ({
  ...withFields(...values),
  type,
});

const makeField = (values) => (action, field, index) => ({
  [field]: values[index],
  ...action,
});

const fromArr = (type, fields) => (values) => fields
  .reduce(makeField(values), { type, });

const makeConstructor = (type, withFields) => isFunction(withFields)
  ? fromFn(type, withFields)
  : fromArr(type, withFields);

export function toCreator(type, withFields=[]) {
  const constructor = makeConstructor(type, withFields);

  return function actionCreator(...args) {
    return constructor(args);
  };
}
