'use strict';

var grunt = require('grunt');

exports.pathseeker = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = {
        js: [
            'test/fixtures/test/first.js',
            'test/fixtures/test/scripts/second.js'
        ],
        css: [
            'test/fixtures/test/first.css',
            'test/fixtures/test/styles/second.css'
        ]
    };
    test.deepEqual(grunt.config.get('pathseeker'), actual, 'Should find two blocks with two paths each.');

    test.done();
  }
};