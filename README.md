# grunt-sass-imagemapper

One of the biggest drawbacks when Compass is no longer part of the workflow is the lack of image handling. The Plugin will try to compensate it and bring back the comfort. It runs over your Image directory and generate a Image Map. 

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-imagemapper --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-imagemapper');
```

## The "sass_imagemapper" task

### Overview
In your project's Gruntfile, add a section named `sass_imagemapper` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
});
```

### Options

#### options.prefix
Type: `String`
Default value: `''`

Prefix the Target Selector in the Image Map. Normaly not needed.

### Best use case
Seperate the Images in different Folders, when using the Mixins. The Target Selector based on the Name off the image, prefixed with the folder name.

- SVG (and PNG Fallbacks) in `svg/`
- Textures in `textures/`
- Single Images in `single/`

The Plugin generate now a image map:

```scss
$map-images: ( 
  textures-dots-2x: (
    file: 'dots-2x.png',
    type: 'textures',
    name: 'dots-2x',
    extension: '.png',
    width: 12px,
    height: 12px
  ),
  textures-dots: (
    file: 'dots.png',
    type: 'textures',
    name: 'dots',
    extension: '.png',
    width: 6px,
    height: 6px
  ),
  svg-dots: (
    file: 'dots.png',
    type: 'svg',
    name: 'dots',
    extension: '.png',
    width: 6px,
    height: 6px
  ),
);
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Based on [CSS-Image](https://npmjs.org/package/grunt-css-image)

## Release History
_(Nothing yet)_
