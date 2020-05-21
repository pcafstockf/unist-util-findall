/**
 * @author Frank Stock
 * @copyright 2020 Frank Stock
 * @license MIT
 * @module unist:findAll
 *
 * Credits to Richard Smith-Unna (https://github.com/blahah/unist-util-find)
 * I simply copied his great work and tweaked it.
 */

'use strict'

var visit = require('unist-util-visit')
var iteratee = require('lodash.iteratee')

/**
 * findAll
 *
 * @param {Node} tree - Root node
 * @param {string|object|function} [condition] - Condition to match node.
 * @returns an Array of zero or more Nodes in the tree that matched the condition.
 */
function findAll (tree, condition) {
  if (!tree) throw new Error('unist-findAll requires a tree to search')
  if (!condition) throw new Error('unist-findAll requires a condition')

  var predicate = iteratee(condition)
  var results = []

  visit(tree, function (node) {
    if (predicate(node)) {
      results.push(node)
      return true
    }
  })

  return results
}

/*
 * Expose.
 */
module.exports = findAll
