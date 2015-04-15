var profile = {
  resourceTags: {
    ignore: function(filename, mid) {
      return /\.scss$/.test(filename) || /\/static-templates\//.test(filename);
    },

    // Files that contain test code.
    test: function (filename, mid) {
      return /\/test\//.test(filename);
    },

    // Files that should be copied as-is without being modified by the build system.
    copyOnly: function (filename, mid) {
      return /\/workers\//.test(filename);
    },

    // Files that are AMD modules.
    amd: function (filename, mid) {
      return /\.js$/.test(filename) && !/\/workers\//.test(filename);
    },

    // Files that should not be copied when the “mini” compiler flag is set to true.
    miniExclude: function (filename, mid) {
      return false;
    }
  }

};
