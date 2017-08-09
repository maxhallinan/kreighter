import { toCreator, } from './creator';
import { entries, isFunction, isObject, isUndefined, } from './util';

const mapTypeToCreator = withValues => ([ key, type, ]) =>
  ({ [key]: toCreator(type, withValues), });

const combineCreators = (combined, creator) =>
  Object.assign(combined, creator);

export default function fromMap(typeMap, withValues) {
  if (!isObject(typeMap)) {
    throw new TypeError(
      `Please check the first argument. \`typeMap\` must be an object.`);
  }

  if (!isUndefined(withValues) && !isFunction(withValues)) {
    throw new TypeError(
      `Please check the second argument. \`withValues\` must be a function.`);
  }

  const creators = entries(typeMap)
    .map(mapTypeToCreator(withValues))
    .reduce(combineCreators, {});

  return creators;
}
