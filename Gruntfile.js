/*
 * grunt-sass-imagemapper
 * https://github.com/gisu/grunt-sass-imagemapper
 *
 * Copyright (c) 2014 Sascha Fuchs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',        
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    sass_imagemapper: {
      all: {
        files:[{
          cwd:"tmp/assets/img/",
          src: [
            "single/**/*.{png,jpg,gif,jpeg}",
            "textures/**/*.{png,jpg,gif,jpeg}",
            "svg/**/*.png"
          ],
          dest: "src/scss/maps/_imagemap.scss"
        }],
        options:{
          prefix: ""
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass_imagemapper', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
