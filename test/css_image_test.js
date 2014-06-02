'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_image = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {        
    var actual = grunt.file.read('tmp/_custom.css');
    
    test.ok(actual.indexOf(".custom__2") > 0);
    test.ok(actual.indexOf(".custom_cat_20090508_025_amazing") > 0);
    test.ok(actual.indexOf(".custom__7151") > 0);
    test.ok(actual.indexOf(".custom__thumbkoshki3912") > 0);
    test.ok(actual.indexOf("background") > 0);
    test.ok(actual.indexOf("background: red") > 0);
    test.ok(actual.indexOf("width:") > 0);
    test.ok(actual.indexOf("height:") > 0);
    test.ok(actual.indexOf("z-index: 0;") > 0);
    test.ok(actual.indexOf("text-indent: -5000px;") > 0);
    test.ok(actual.indexOf("display: block;") > 0);
    test.ok(actual.indexOf("http://example.com/") > 0);
    test.ok(actual.indexOf('background: red url("http://example.com/2.png") 0px 0px no-repeat;') > 0);
    test.done();
  },
};
