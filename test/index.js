var path = require('path');
var fs = require('fs');
var assert = require('assert');
var AsciiTreeFilter = require('../index');

describe('Filter', function() {
  describe('#convert()', function() {
    it('no append should work', function() {
      var lines = [];
      lines[0] = "{% asciitree %}";
      lines[1] = "hello";
      lines[2] = "{% endasciitree %}";

      var ft = new AsciiTreeFilter('test');

      var newLines = ft.processString(lines.join("\n"), "").split("\n");
      assert.equal(1, newLines.length);
    });

    it('with append should work', function() {
      var lines = [];
      lines[0] = "{% asciitree %}";
      lines[1] = "hello";
      lines[2] = "{% endasciitree %}";

      var ft = new AsciiTreeFilter('test', null, null, "<pre>", "</pre>");

      var newLines = ft.processString(lines.join("\n"), "").split("\n");
      assert.equal(3, newLines.length);
      assert.equal("<pre>", newLines[0]);
      assert.equal("</pre>", newLines[2]);
    });
  });
});
