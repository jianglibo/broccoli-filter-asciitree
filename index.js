var Filter = require('broccoli-filter');
var path = require('path');
var fs = require('fs');
var WholeFileProcessor = require('./whole-file-processor');

AsciiTreeFilter.prototype = Object.create(Filter.prototype);
AsciiTreeFilter.prototype.constructor = AsciiTreeFilter;

function AsciiTreeFilter(inputNode, startTag, endTag, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.startTag = startTag || "---dtree---";
  this.endTag = endTag || "---dtreeend---";
}

AsciiTreeFilter.prototype.extensions = ['md'];
AsciiTreeFilter.prototype.targetExtension = 'md'; //被处理的extension之后的extension。

AsciiTreeFilter.prototype.processString = function(content, relativePath) {
  var lines = content.split("\n");
  return new WholeFileProcessor(lines, this.startTag, this.endTag).process(lines).join("\n");
};

module.exports = AsciiTreeFilter;
