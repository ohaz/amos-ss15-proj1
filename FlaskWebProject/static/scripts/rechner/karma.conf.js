// Karma configuration
// Generated on Thu Sep 12 2013 15:10:54 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'spec/helpers/**/*.js', included: true},
      {pattern: 'spec/**/*Spec.js', included: false},
      {pattern: 'spec/**/testData*.js', included: false},
      {pattern: 'shared/**/*.js', included: false},

      {pattern: 'annuitaetendarlehen/**/*.js', included: false},
      {pattern: 'barendwert/**/*.js', included: false},
      {pattern: 'breakeven/**/*.js', included: false},
      {pattern: 'brutto-netto/**/*.js', included: false},
      {pattern: 'est-tarif/**/*.js', included: false},
      {pattern: 'est-zve/**/*.js', included: false},
      {pattern: 'gew-st-rueck/**/*.js', included: false},
      {pattern: 'immo-invest/**/*.js', included: false},
      {pattern: 'krisen-signal/**/*.js', included: false},
      {pattern: 'projekt-planer/**/*.js', included: false},
      {pattern: 'steuerberater-verguetung/**/*.js', included: false},
      {pattern: 'steuerberater-verguetung/**/*.csv', included: false},
      {pattern: 'zerobond/**/*.js', included: false},
      {pattern: 'zinsrechner/**/*.js', included: false},

      'spec/main.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ["PhantomJS"],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
