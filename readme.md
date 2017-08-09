# kreighter

A utility for generating Redux action creators.


## Install

```
$ npm install --save kreighter
```


## Usage

```js
import { fromMap, fromType, } from 'kreighter';

const toggleFoo = fromType('TOGGLE_FOO');
toggleFoo(); // { type: 'TOGGLE_FOO', }

const setId = id => ({ id, });

const destroyFoo = fromType('DESTROY_FOO', setId);
destroyFoo(1); // { type: 'DESTROY_FOO', id: 1, }

const destroy = fromMap(
  {
    foo: 'DESTROY_FOO',
    bar: 'DESTROY_BAR',
    baz: 'DESTROY_BAZ',
  },
  setId
);
destroy.foo(1); // { type: 'DESTROY_FOO', id: 1, }
destroy.bar(2); // { type: 'DESTROY_BAR', id: 2, }
destroy.baz(3); // { type: 'DESTROY_BAZ', id: 3, }
```


## API

### fromType(type, withValues)

Takes an action type and an optional map function. Returns an action creator for
the given action type.

#### type

Type: `String`

The value set as the action's `type` property. The type of `type` is not
enforced but there are [good reasons](http://redux.js.org/docs/faq/Actions.html#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)
to use a string constant.

#### withValues

Type: `* -> Object`<br>
Default: `undefined`

A function that maps action creator arguments to an object that is merged
with the created action.


### fromMap(typeMap, withValues)

Takes an object map of action types and an optional map function. Returns
an object map of action creators, one for each action type.

#### typeMap

Type: `{ k: String }`

An object map of arbitrary keys and action type values. The key for each action type
is used as the key for the corresponding action creator on the returned object map.

#### withValues

Type: `* -> Object`<br>
Default: `undefined`

A function that maps action creator arguments to an object that is merged
with the created action.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
