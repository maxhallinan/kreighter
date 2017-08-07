import { assert, } from 'chai';
import { fromType, } from '../../src';

describe('kreeater > fromType', function () {
  const ACTION_TYPE = 'ACTION_TYPE';

  it('Throws an error if withValues is not a function.', function () {
    assert.throws(() => fromType(ACTION_TYPE, {}));
  });

  it('Throws an error if withValues does not return an object.', function () {
    assert.throws(() => fromType(ACTION_TYPE, () => []));
  });

  it('Returns a function.', function () {
    const actionCreator = fromType(ACTION_TYPE);

    assert.isFunction(actionCreator);
  });

  it('Returns a function that returns an action with the expected type.', function () {
    const actionCreator = fromType(ACTION_TYPE);
    const action = actionCreator();

    assert.isObject(action);
    assert.equal(action.type, ACTION_TYPE);
    assert.equal(Object.keys(action).length, 1);
  });

  it('Returns a function that returns an action with the expected values.', function () {
    const expected = {
      type: ACTION_TYPE,
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    };
    const expectedKeys = Object.keys(expected);
    const withValues = (foo, bar, baz) => ({ foo, bar, baz, });

    const actionCreator = fromType(ACTION_TYPE, withValues);
    const action = actionCreator(expected.foo, expected.bar, expected.baz);
    const actionKeys = Object.keys(action);

    assert.equal(expected.length, actionKeys.length);
    actionKeys.forEach(k => assert.equal(expected[k], action[k]))
  });
});
