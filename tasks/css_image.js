(function() {
  "use strict";
  var fs, imagesize, path;

  imagesize = require("imagesize");

  fs = require("fs");

  path = require("path");

  module.exports = function(grunt) {
    return grunt.registerMultiTask("sass_imagemapper", "Plugin to generate css file wto bind all images from folder", function() {
      
      var complete, counts, done, getCssClass, getName, info, options, _;

      _ = grunt.util._;

      getName = function(item) {
        return item.filename.replace(/\.(png|jpg|jpeg|gif)/, "");
      };

      getCssClass = function(options) {
        var  className, css_class_name, ext, folder, folderName, height, name, prefix, txt, width;

        prefix = options.prefix,
        width = options.width,
        height = options.height,
        folder = options.folder,
        name = options.name,
        ext = options.ext;

        className = name.replace(".", "");
        folderName = folder.replace("/", "_").replace(".", "");

        txt = "";

        css_class_name = prefix +folder+ "-" + className;
        // return "\n  ("+css_class_name+" '"+name+ext+"' "+width+"px "+height+"px '"+name+"' '"+ext+"')";
        return "\n  "+css_class_name+": (\n    file: '"+name+ext+"',\n    type: '"+folder+"',\n    name: '"+name+"',\n    extension: '"+ext+"',\n    width: "+width+"px,\n    height: "+height+"px\n  ),"
      };

      options = this.options({
        prefix: ""
      });

      info = [];

      done = this.async();

      counts = grunt.util._.reduce(this.files, function(memo, item) {
        return memo + grunt.util._.size(item.src);
      }, 0);

      complete = grunt.util._.after(counts, function(err, opts) {
        var dest, txt, txtend;
        dest = opts.dest;

        info = _.sortBy(opts.info, function(item) {
          return item.filename;
        });

        // txt = "$map-images: (  \n(selector file width heigth name ext)";
        txt = "$map-images: ( ";
        txtend = "\n);"

        info.forEach(function(item) {
          var folder;
          folder = item.folder;

          return txt += getCssClass({
            prefix: options.prefix,
            width: item.width,
            height: item.height,
            folder: folder,
            name: getName(item),
            ext: item.ext
          });

        });

        grunt.file.write(dest, txt + txtend);
        grunt.log.writeln("File \"" + dest + "\" created.");
        return done();
      });

      return this.files.forEach(function(f) {
        return f.src.forEach(function(itempath) {
          var src;
          src = path.join(f.cwd, itempath);
          return fs.readFile(src, function(err, data) {
            var parser, result, retStatus;
            parser = imagesize.Parser();
            retStatus = parser.parse(data);
            if (imagesize.Parser.DONE === retStatus) {
              result = parser.getResult();
              result.filename = path.basename(src);
              result.ext = path.extname(src);
              result.folder = path.dirname(itempath);
              info.push(result);
            }
            return complete(null, {
              info: info,
              dest: f.dest
            });
          });
        });
      });
    });
  };

}).call(this);