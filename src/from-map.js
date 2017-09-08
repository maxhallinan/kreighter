import { toCreator, } from './creator';
import { entries, isArray, isFunction, isObject, isUndefined, } from './util';

const mapTypeToCreator = (withFields) => ([ key, type, ]) =>
  ({ [key]: toCreator(type, withFields), });

const combineCreators = (combined, creator) =>
  Object.assign(combined, creator);

export default function fromMap(typeMap, withFields) {
  if (!isObject(typeMap)) {
    throw new TypeError(
      `Please check the first argument. \`typeMap\` must be an object.`);
  }

  if (!isUndefined(withFields) && !(isFunction(withFields) || isArray(withFields))) {
    throw new TypeError(
      `Please check the second argument. \`withFields\` must be an array or a function.`);
  }

  const creators = entries(typeMap)
    .map(mapTypeToCreator(withFields))
    .reduce(combineCreators, {});

  return creators;
}
