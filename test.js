var test = require('tape')
var remark = require('remark')
var findAll = require('./index.js')

test('unist-findall', function (t) {
  var tree = remark().parse('Some _emphasis_, **strongness**, and `code`.')

  t.throws(function () {
    findAll()
  }, 'should fail without tree')

  t.throws(function () {
    findAll(tree)
  }, 'should fail without condition')

  t.test('should find with string condition', function (st) {
    var results = findAll(tree, 'value')

    st.equal(results.length, 7)
    st.equal(results[0], tree.children[0].children[0])

    st.end()
  })

  t.test('should find with object condition', function (st) {
    var results = findAll(tree, { type: 'emphasis' })

    st.equal(results.length, 1)
    st.equal(results[0], tree.children[0].children[1])

    st.end()
  })

  t.test('should find with function condition', function (st) {
    var results = findAll(tree, function (node) {
      return node.type === 'inlineCode'
    })

    st.equal(results.length, 1)
    st.equal(results[0], tree.children[0].children[5])

    st.end()
  })

  t.test('should return an empty array if no matches', function (st) {
    var results = findAll(tree, 'nope, nope, nope')

    st.equal(results.length, 0)

    st.end()
  })
})
