# kreighter

[![Build Status](https://travis-ci.org/maxhallinan/kreighter.svg?branch=master)](https://travis-ci.org/maxhallinan/kreighter)
[![Coverage Status](https://coveralls.io/repos/github/maxhallinan/kreighter/badge.svg)](https://coveralls.io/github/maxhallinan/kreighter)

A utility for generating Redux action creators.


## Install

```
$ npm install --save kreighter
```


## Usage

```javascript
import { fromMap, fromType, } from 'kreighter';
import { toTitleCase, } from './util';

const toggleFoo = fromType('TOGGLE_FOO');
toggleFoo(); // { type: 'TOGGLE_FOO', }

const formatTitle = (id, title) => ({ id, title: toTitleCase(title), });

const updateTitle = fromType('UPDATE_TITLE', formatTitle);
updateTitle('foo bar baz'); // { type: 'UPDATE_TITLE', title: 'Foo Bar Baz', }

const destroy = fromMap(
  {
    foo: 'DESTROY_FOO',
    bar: 'DESTROY_BAR',
    baz: 'DESTROY_BAZ',
  },
  [ 'id', ],
);
destroy.foo(1); // { type: 'DESTROY_FOO', id: 1, }
destroy.bar(2); // { type: 'DESTROY_BAR', id: 2, }
destroy.baz(3); // { type: 'DESTROY_BAZ', id: 3, }
```


## API

### fromType(type, withFields)

Takes an action type and an optional action fields definition. Returns an
action creator for the given action type.

#### type

Type: `String`

The value set as the action's `type` property. The type of `type` is not
enforced but there are [good reasons](http://redux.js.org/docs/faq/Actions.html#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)
to use a string constant.

#### withFields

Type: `[String] | (*...) -> Object`<br>
Default: `undefined`

Arbitrary fields can be set on the action through the `withFields` option.
`withFields` supports one of two types:

- An array of field names.
- A function that returns an arbitrary object.

If `withFields` is an array, each action creator argument is paired with the field
name in the same position, and this set of key/value pairs is merged into the
created action.

If `withFields` is a function, it should map action creator arguments to an arbitrary
object that is merged with the created action.


### fromMap(typeMap, withFields)

Takes an object map of action types and an optional map function. Returns
an object map of action creators, one for each action type.

#### typeMap

Type: `{ k: String }`

An object map of arbitrary keys and action type values. The key for each action type
is used as the key for the corresponding action creator on the returned object map.

#### withFields

Type: `[String] | (*...) -> Object`<br>
Default: `undefined`

Arbitrary fields can be set on the action through the `withFields` option.
`withFields` supports one of two types:

- An array of field names.
- A function that returns an arbitrary object.

If `withFields` is an array, each action creator argument is paired with the field
name in the same position, and this set of key/value pairs is merged into the
created action.

If `withFields` is a function, it should map action creator arguments to an arbitrary
object that is merged with the created action.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
