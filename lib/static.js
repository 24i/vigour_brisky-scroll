'use strict'
exports.scrollTop = function scrollTopStatic (target, node) {
  node.scrollTop = target.compute()
}

exports.scrollLeft = function scrollLeftStatic (target, node) {
  node.scrollLeft = target.compute()
}
