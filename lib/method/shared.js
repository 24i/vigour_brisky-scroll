'use strict'
exports.overflowX = function overflowX (node) {
  return node.scrollWidth - node.clientWidth
}

exports.overflowY = function overflowY (node) {
  return node.scrollHeight - node.clientHeight
}
