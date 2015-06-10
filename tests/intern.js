// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,
	
	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://localhost:9000/',
	
	// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
	// specified browser environments in the `environments` array below as well. See
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
	// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
	// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
	// automatically
	capabilities: {
		'selenium-version': '2.45.0'
	},

	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [

		{ browserName: 'chrome' }
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 3,

	/*// Name of the tunnel class to use for WebDriver tests
	tunnel: 'NullTunnel',

	tunnelOptions: {
		clientUrl:'http://ec2-52-10-82-161.us-west-2.compute.amazonaws.com:4444/wd/hub/',
		port: 4444
	},*/

	// Connection information for the remote WebDriver service. If using Sauce Labs, keep your username and password
	// in the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables unless you are sure you will NEVER be
	// publishing this configuration file somewhere
	webdriver: {
		host: 'localhost',
		port: 4444
	},

	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	useLoader: {
		'host-node': 'dojo/dojo',
		'host-browser': 'node_modules/dojo/dojo.js'
	},

	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
	// can be used here
	loader: {
		// Packages that should be registered with the loader in each testing environment
		packages: [ { name: 'rechner-brutto-netto', location: 'rechner-brutto-netto' } ]
	},

	// Non-functional test suite(s) to run in each browser
	suites: [ /*'tests/unit/hello'*/ ],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	functionalSuites: [
       'tests/functional/connect-to-azure',
		'tests/functional/azure/login',
		'tests/functional/azure/index-web',
		'tests/functional/azure/index-web_rev',
		'tests/functional/azure/index-file-management',
	    'tests/functional/azure/userauth',
		'tests/functional/connect-to-google',
		'tests/functional/google/login',
		'tests/functional/google/index-web',
		'tests/functional/google/index-web_rev',
		'tests/functional/google/index-file-management',
	    'tests/functional/google/userauth',
    	'tests/functional/connect-to-aws',
		'tests/functional/aws/login',
		'tests/functional/aws/index-web',
		'tests/functional/aws/index-web_rev',
		'tests/functional/aws/index-file-management'
	    'tests/functional/aws/userauth',
	],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|node_modules)\//
});
