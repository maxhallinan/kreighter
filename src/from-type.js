import { emptyValues, toCreator, } from './creator';
import { isFunction, isUndefined, } from './util';

export default function fromType(type, withValues=emptyValues) {
  if (isUndefined(type)) {
    throw new TypeError(
      `Please check the first argument. \`type\` must be defined.`);
  }

  if (!isUndefined(withValues) && !isFunction(withValues)) {
    throw new TypeError(
      `Please check the second argument. \`withValues\` must be a function.`);
  }

  return toCreator(type, withValues);
}
