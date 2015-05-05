function isSpecFile(filename) {
  return /spec\//.test(filename);
}

function isNodeModule(filename) {
  return /node_modules\//.test(filename);
}

function isJSFile(filename) {
  return /\.js$/.test(filename);
}

function isKarmaConf(filename) {
  return /karma\.conf/.test(filename);
}

var profile = {
  // Resource tags are functions that provide hints to the compiler about a given file. The first argument is the
  // filename of the file, and the second argument is the module ID for the file.
  resourceTags: {
    // Files that contain test code.
    test: function (filename, mid) {
      return isSpecFile(filename);
    },

    // Files that should be copied as-is without being modified by the build system.
    copyOnly: function (filename, mid) {
      return isKarmaConf(filename) || isNodeModule(filename);
    },

    // Files that are AMD modules.
    amd: function (filename, mid) {
      return isJSFile(filename) && !isSpecFile(filename) && !isKarmaConf(filename) && !isNodeModule(filename);
    },

    // Files that should not be copied when the “mini” compiler flag is set to true.
    miniExclude: function (filename, mid) {
      return isSpecFile(filename) || isKarmaConf(filename) || isNodeModule(filename);
    }
  }
};
