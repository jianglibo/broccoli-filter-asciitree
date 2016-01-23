var AsciiTreeConverter = require('my-ascii-tree');
module.exports = WholeFileProcessor;

function WholeFileProcessor(allLines, startTag, endTag) {
  this.allLines = allLines;
  this.startTag = startTag;
  this.endTag = endTag;
}

WholeFileProcessor.prototype.process = function() {
  var i = 0,
    allLines = this.allLines,
    lt,
    treeStarted = false,
    blocks = [],
    block = [];

  allLines.forEach(function(line, idx) {
    lt = this.lineType(line);
    if (lt === 'NO') {
      block.push(line);
    } else {
      if (lt === 'START') {
        treeStarted = true;
        if (block.length > 0) {
          blocks.push(block);
        }
      } else {
        treeStarted = false;
        if (block.length > 0) {
          blocks.push(new AsciiTreeConverter(block).convert());
        }
      }
      block = [];
    }
  }, this);

  if (block.length > 0) {
    if (treeStarted) {
      blocks.push(this.transform(block));
    } else {
      blocks.push(block);
    }
  }
  var afterLines = [];
  blocks.forEach(function(bk) {
    bk.forEach(function(line) {
      afterLines.push(line);
    });
  });
  return afterLines;
};

WholeFileProcessor.prototype.lineType = function(line) {
  var trimed = line.trim(),
    isStartTagString = (typeof this.startTag) === 'string',
    isEndTagString = (typeof this.endTag) === 'string';

    if (isStartTagString) {
      if (trimed.indexOf(this.startTag) !== -1) {
        return 'START';
      }
    } else {
      if (this.startTag.exec(trimed)) {
        return 'START';
      }
    }

    if (isEndTagString) {
      if (trimed.indexOf(this.endTag) !== -1) {
        return 'END';
      }
    } else {
      if (this.endTag.exec(trimed)) {
        return 'END';
      }
    }
    return 'NO';
};
