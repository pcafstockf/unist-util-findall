var remark = require('remark')
var findAll = require('./index.js')

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
