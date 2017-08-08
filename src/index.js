import { All, Left, Right, } from './types';
import {
  compose,
  entries,
  invert,
  isFunction,
  isObject,
  isString,
  isUndefined,
  map,
  reduce,
} from './util';

const isValidType = compose(
  invert,
  isUndefined
);

const isValidArgs = ([ type, withValues, ]) =>
  All(isValidType(type))
    .concat(
      All(isFunction(withValues)));

const fromValidArgs = args =>
  isValidArgs(args)
    .fold(isValid => !isValid ? Left(args) : Right(args));

const getActionCreator = ([ type, withValues, ]) => (...args) => ({
  ...(withValues(...args)),
  type,
});

const defaultWithValues = () => ({});

export const fromType = (type, withValues=defaultWithValues) =>
  fromValidArgs([ type, withValues, ])
    .fold(
      () => { throw new Error('Invalid args!'); },
      getActionCreator);

const isAllStrings = reduce((all, [ key, type, ]) => all.concat(isString(type)));
const isValidTypes = compose(isAllStrings(All.empty()), entries);
const isValidTypeMap = compose(isValidTypes, isObject);

const isValidMapArgs = ([ typeMap, withValues, ]) =>
  All(isValidTypeMap(typeMap))
    .concat(
      All(isFunction(withValues)));

const fromValidMapArgs = args =>
  isValidMapArgs(args)
    .fold(isValid => !isValid ? Left(args) : Right(args));

const typeToCreator = withValues => ([ key, type ]) => ({
  [key]: getActionCreator([ type, withValues, ]),
});

const creatorsToMap = (creatorMap, creator) => Object.assign(creatorMap, creator);

const typesToCreators = ([ typeMap, withValues, ]) =>
  entries(typeMap)
    .map((entry) => typeToCreator(withValues)(entry))
    .reduce(creatorsToMap, {});

export const fromMap = (typeMap, withValues=defaultWithValues) =>
  fromValidMapArgs([ typeMap, withValues, ])
    .fold(
      () => { throw new Error('Invalid args!'); },
      typesToCreators);

export default { fromType, fromMap, };
