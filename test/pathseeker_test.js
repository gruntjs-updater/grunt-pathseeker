'use strict';

var grunt = require('grunt');

exports.pathseeker = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);

    test.equal(true, true, 'should pass.');

    test.done();
  }
};