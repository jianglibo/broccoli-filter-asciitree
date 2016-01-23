var Filter = require('broccoli-filter');
var path = require('path');
var fs = require('fs');
var asciitree = require('my-ascii-tree');

AsciiTreeFilter.prototype = Object.create(Filter.prototype);
AsciiTreeFilter.prototype.constructor = AsciiTreeFilter;

function AsciiTreeFilter(inputNode, startTag, endTag,prepend, append, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.startTag = startTag || /^{%\s+asciitree\s+%}$/;
  this.endTag = endTag || /^{%\s+endasciitree\s+%}$/;
  this.prepend = prepend;
  this.append = append;
}

AsciiTreeFilter.prototype.extensions = ['md'];
AsciiTreeFilter.prototype.targetExtension = 'md'; //被处理的extension之后的extension。

AsciiTreeFilter.prototype.processString = function(content, relativePath) {
  var lines = content.split("\n");
  return new asciitree.AsciiTrees(lines, this.startTag, this.endTag, this.prepend, this.append).convert().join("\n");
};

module.exports = AsciiTreeFilter;
