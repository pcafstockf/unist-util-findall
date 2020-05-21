# unist-util-findall
[![Actions Status](https://github.com/pcafstockf/unist-util-findall/workflows/CI/badge.svg)](https://github.com/pcafstockf/unist-util-findall/actions)
[![Actions Status](https://github.com/pcafstockf/unist-util-findall/workflows/NPM%20Publish/badge.svg)](https://github.com/pcafstockf/unist-util-findall/actions)
[![npm version](https://badge.fury.io/js/unist-util-findall.svg)](https://badge.fury.io/js/unist-util-findall)
[![Actions Status](https://david-dm.org/pcafstockf/unist-util-findall.svg)](https://github.com/pcafstockf/unist-util-findall/package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Unist](https://github.com/wooorm/unist) utility to select everything in a tree that matches a given condition.  
Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

## Why?

[unist-util-find](https://github.com/blahah/unist-util-find) returns as soon as a single match is found.  
[unist-util-find-all-after](https://github.com/syntax-tree/unist-util-find-all-after), [unist-util-find-all-before](https://github.com/syntax-tree/unist-util-find-all-before), and [unist-util-find-all-between](https://github.com/mrzmmr/unist-util-find-all-between), only search immediate children.*  
[unist-util-filter](https://github.com/syntax-tree/unist-util-filter) creates a new copy of each matched node.  
findAll is a lot like [unist-util-select](https://github.com/syntax-tree/unist-util-select), except that you can use object and function conditions.

*The findall phrase (no hyphen) was chosen to distinguish it from the find-all-xxx utilities).

## Installation

```
npm install --save unist-util-findall
```

## Usage

### Example

```js
var remark = require('remark')
var findAll = require('unist-util-findall')

remark()
  .use(function () {
    return function (tree) {
      // string condition
      console.log(findAll(tree, 'value'))

      // object condition
      console.log(findAll(tree, { value: 'emphasis' }))

      // function condition
      console.log(findAll(tree, function (node) {
        return node.type === 'inlineCode'
      }))
    }
  })
  .processSync('Some _emphasis_, **strongness**, and `code`.')

```

Result:

```
// string condition: 'value'
[
  { "type": "text", "value": "Some " },
  {  "type": "text",  "value": "emphasis" },
  {  "type": "text", "value": ", " },
  { "type": "text", "value": "strongness" },
  { "type": "text", "value": ", and " },
  { "type": "inlineCode", "value": "code" },
  { "type": "text", "value": "." }
]

// object condition: { value: 'emphasis' }
[
  { "type": "text", "value": "emphasis" }
]

// function condition: function (node) { return node.type === 'inlineCode' }
[
  { "type": "inlineCode", "value": "code" }
]
```

### API

#### `findAll(node, condition)`

Returns an Array of zero or more nodes that match `condition`.

- `node` ([`Node`](https://github.com/wooorm/unist#node)) - Node to search
- `condition` (`string`, `object` or `function`) - Condition used to test each node. Behaviour depends on the type of the condition:
  - `string` finds first node with a truthy property matching `string`
  - `object` finds first node that has matching values for all properties of `object`
  - `function` finds first node for which `function` returns true when passed `node` as argument

## License

MIT
