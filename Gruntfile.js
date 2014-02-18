/*
 * grunt-pathseeker
 * https://github.com/zamtools/grunt-pathseeker
 *
 * Copyright (c) 2014 Zamtools Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    pathseeker: {
      default_options: {
        options: {
        },
        files: [
          {src:'test/fixtures/test.html'}
        ]
      }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'pathseeker', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
