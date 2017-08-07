# kreighter

*Work in progress.*

A utility for generating Redux action creators.


## Install

```
$ npm install kreighter
```


## Usage

```js
const kreighter = require('kreighter');

const toggleFoo = kreighter.fromType('TOGGLE_FOO');
toggleFoo();
// { type: 'TOGGLE_FOO', }

const createBar = kreighter.fromType(
  'CREATE_BAR',
  (author, text) => ({ author, text, }));
const author = 'Oliver Wendell Holmes, Jr.'
const text = 'other tools are needed besides logic';
createBar(author, text);
// {
//  type: 'CREATE_BAR',
//  author, 'Oliver Wendel Holmes, Jr.',
//  text: 'other tools are needed besides logic.',
// }

const destroy = kreighter.fromMap(
  { foo: 'DESTROY_FOO', bar: 'DESTROY_BAR', baz: 'DESTROY_BAZ', }
  id => ({ id, }));
destroy.foo(1)
// { type: 'DESTROY_FOO', id: 1, }
destroy.bar(1);
// { type: 'DESTROY_BAR', id: 1, }
destroy.baz(1);
// { type: 'DESTROY_BAZ', id: 1, }
```


## API

### kreighter.fromType(actionType, withValues)

#### actionType

Type: `String`

Value set as the action's `type` property. `actionType` could be any value
but there are [good reasons](http://redux.js.org/docs/faq/Actions.html#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)
to use a string constant.

#### withValues

Type: `Function`<br>
Default: `undefined`


### kreighter.fromMap(actionMap, withValues)

#### actionMap

Type: `Object`

#### withValues

Type: `Function`<br>
Default: `undefined`


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
