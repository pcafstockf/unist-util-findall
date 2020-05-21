# unist-util-findall

[Unist](https://github.com/wooorm/unist) node finding utility. Useful for working with [remark](https://github.com/wooorm/remark), [rehype](https://github.com/wooorm/rehype) and [retext](https://github.com/wooorm/retext).

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
