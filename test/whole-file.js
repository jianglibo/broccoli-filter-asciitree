var path = require('path');
var fs = require('fs');
var assert = require('assert');
var WholeFileProcessor = require('../whole-file-processor');

describe('WholeFileProcessor', function() {
  describe('#process()', function() {
    it('string tag should work', function() {
      var lines = [];
      lines[0] = "---start---";
      lines[1] = "hello";
      lines[2] = "---end---";
      var wfp = new WholeFileProcessor(lines, lines[0], lines[2]);

      var newLines = wfp.process();
      assert.equal(1, newLines.length);
    });

    it('regex tag should work', function() {
      var lines = [];
      lines[0] = "{% asciitree %}";
      lines[1] = "hello";
      lines[2] = "{% endasciitree %}";
      var wfp = new WholeFileProcessor(lines, /^{%\s+asciitree\s+%}$/, /^{%\s+endasciitree\s+%}$/);

      var newLines = wfp.process();
      assert.equal(1, newLines.length);
    });

  });
});
