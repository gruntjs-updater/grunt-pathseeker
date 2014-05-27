/*
 * grunt-pathseeker
 * https://github.com/zamtools/grunt-pathseeker
 *
 * Copyright (c) 2014 Zamtools Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var _ = require('lodash');

  grunt.registerMultiTask('pathseeker', 'Searches for paths within pathseeker blocks and adds them to Grunt variables.', function() {
    var blockPattern = /<!--\s*pathseeker[\s\S]*?pathseeker\s*-->/gm;
    var namePattern  = /^<!--\s*pathseeker:([a-z0-9]+)\s*-->/;
    var pathPattern  = /(src|href)=['"][\s\S]*?['">]/gm;

    var options = this.options({
      basePath: true
    });

    var foundpaths = {};
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      src.forEach(function(filepath) {
        grunt.log.writeln('seeking paths in ' + filepath);

        // get the base path of the target file
        var basePath = '';
        var lastSlash = filepath.lastIndexOf('/');
        if (lastSlash > -1) {
          basePath = filepath.slice(0, lastSlash);
        }

        var content = grunt.file.read(filepath);
        // find all blocks
        var blockMatches = content.match(blockPattern);
        if (blockMatches) {
          blockMatches.forEach(function(block) {
            // determine the block's variable name
            var nameMatch = block.match(namePattern);
            if (nameMatch && nameMatch.length >= 2) {
              var name = nameMatch[1];
              grunt.log.writeln('found block: ' + name);
              // start a list of found paths
              if (!foundpaths[name]) {
                foundpaths[name] = [];
              }
              // find all paths within the block
              var pathMatches = block.match(pathPattern);
              if(pathMatches) {
                pathMatches.forEach(function(path) {
                  // sanitize path
                  path = path.replace(/(src|href)=/, '');
                  path = path.replace(/['">]*/g, '');
                  // get complete path relative to the base
                  var relativePath = '';
                  // optionally prepend basePath
                  if (options.basePath === true) {
                    relativePath = basePath + '/';
                  } else if (typeof options.basePath === 'string') {
                    relativePath = options.basePath;
                    // append slash if one doesn't exist
                    if (relativePath.lastIndexOf('/') !== relativePath.length - 1) {
                      relativePath += '/';
                    }
                  }
                  relativePath += path;
                  if (!_.contains(foundpaths[name], relativePath)) {
                    foundpaths[name].push(relativePath);
                    grunt.log.writeln('    ' + relativePath);
                  }
                });
              }
            } else {
              grunt.log.error('invalid block parameters');
            }
          });
        }
      });

      // make the paths available via a Grunt variable
      grunt.config.set('pathseeker', foundpaths);
    });
  });
};
