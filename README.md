# grunt-pathseeker

> Searches for paths within pathseeker blocks and adds them to Grunt variables.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pathseeker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pathseeker');
```

## The "pathseeker" task

Pathseeker allows comment blocks to be defined within html files that can be searched for paths to scripts and stylesheets. Those paths are added to config variables that can be used by other task (such as minifiers) within the Gruntfile. This means any new script or stylesheet sources in the html will automatically be picked up by tasks that rely on them.

### Overview
In your project's Gruntfile, add a section named `pathseeker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pathseeker: {
    your_target: {
      files: {
        src: ['app/index.html']
      }
    }
  }
});
```

In the target html files, surround `<script>` or `<link>` tags with pathseeker comment blocks. Each block is opened with `<!-- pathseeker:name -->` and closed with `<!-- pathseekerend -->`. Each block must have a unique name specified after the semi-colon. This name will be the name of the variable made available in your Gruntfile.

```html
<html>
    <head>
        <title>pathseeker</title>
        <!-- pathseeker:scripts -->
            <script src="test/first.js"></script>
            <script src="test/scripts/second.js"></script>
        <!-- endpathseeker -->

        <!-- pathseeker:styles -->
            <link rel="stylesheet" type="text/css" href="test/first.css">
            <link rel="stylesheet" type="text/css" href="test/styles/second.css">
        <!-- endpathseeker -->
    </head>
    <body>
    </body>
</html>
```

Pathseeker will find all `src` and `href` paths within each block. These paths will be stored in arrays named after their respective blocks inside a `pathseeker` config variable. This config variable can be accessed anywhere in the Gruntfile.

```
var pf = grunt.config.get('pathseeker');
console.log( pf.styles ); // returns an array of paths from the css block
```

These arrays of paths can now be used by other tasks.

NOTE: Remember to run the pathseeker task before any tasks that need to access the `pathseeker` config variable.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
1.0.0 - Initial release
