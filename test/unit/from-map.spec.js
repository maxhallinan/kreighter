import { assert, } from 'chai';
import { fromMap, } from '../../src';

describe('kreeater > fromMap', function () {
  const typeMap = {
    foo: 'ACTION_FOO',
    bar: 'ACTION_BAR',
    baz: 'ACTION_BAZ',
  };

  it('Throws an error if typeMap is not an object.', function () {
    assert.throws(() => fromType([]));
  });

  it('Throws an error if withValues is not a function.', function () {
    assert.throws(() => fromType(typeMap, {}));
  });

  it('Throws an error if withValues does not return an object.', function () {
    assert.throws(() => fromType(typeMap, () => []));
  });

  it('Returns an object map of functions.', function () {
    const actionCreators = fromMap(typeMap);

    assert.isObject(actionCreators);

    const creatorKeys = Object.keys(actionCreators);

    assert.equal(creatorKeys.length, 3);
    creatorKeys.forEach(k => assert.isFunction(actionCreators[k]));
  });

  it('Returns an object map with the expected keys.', function () {
    const actionCreators = fromMap(typeMap);
    const typeKeys = Object.keys(typeMap);
    const creatorKeys = Object.keys(actionCreators);

    creatorKeys.forEach(k => assert.include(typeKeys, k));
  });

  it('Each function returns an action with the expected type.', function () {
    const actionCreators = fromMap(typeMap);
    const typeKeys = Object.keys(typeMap);

    typeKeys.forEach(k => assert.isEqual((actionCreators[k]()).type, typeMap[k]));
  });

  it('Each function returns an action with the expected values.', function () {
    const withValues = (foo, bar, baz) => ({ foo, bar, baz, });

    const actionCreators = fromMap(typeMap, withValues);

    Object.keys(typeMap).map(k => {
      const expected = {
        type: typeMap[k],
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
      };
      const creator = actionCreators[k];
      const action = creator(expected.foo, expected.bar, expected.baz);

      const expectedKeys = Object.keys(expected);
      const actionKeys = Object.keys(action);

      assert.equal(Object.keys(e).length, actionKeys.length);
      actionKeys.forEach(k => assert.equal(expected[k], action[k]))
    });
  });
});
