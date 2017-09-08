import { toCreator, } from './creator';
import { isArray, isFunction, isUndefined, } from './util';

export default function fromType(type, withFields) {
  if (isUndefined(type)) {
    throw new TypeError(
      `Please check the first argument. \`type\` must be defined.`);
  }

  if (!isUndefined(withFields) && !(isArray(withFields) || isFunction(withFields))) {
    throw new TypeError(
      `Please check the second argument. \`withFields\` must be an array or a function.`);
  }

  return toCreator(type, withFields);
}
