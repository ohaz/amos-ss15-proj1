var copyOnly = function(filename){
  return /worker\.js$/.test(filename);
};

var profile = {
  // Resource tags are functions that provide hints to the compiler about a given file. The first argument is the
  // filename of the file, and the second argument is the module ID for the file.
  resourceTags: {
    // Files that contain test code.
    test: function (filename, mid) {
      return false;
    },

    // Files that should be copied as-is without being modified by the build system.
    copyOnly: function (filename, mid) {
      return copyOnly(filename);
    },

    // Files that are AMD modules.
    amd: function (filename, mid) {
      return !copyOnly(filename) && /\.js$/.test(filename);
    },

    // Files that should not be copied when the “mini” compiler flag is set to true.
    miniExclude: function (filename, mid) {
      return false;
    }
  }
};
