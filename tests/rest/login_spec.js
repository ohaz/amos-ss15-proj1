var frisby = require('../intern/node_modules/frisby');
var FormData = require('../intern/node_modules/form-data'); // from https://github.com/felixge/node-form-data

var form = new FormData();

// saves user session, is set at first connection
var sessionCookie 
// Cross-site request forgery token, is retreived from form
var csrf_token
// allready registred test user
var username = "test11"
var password = "password"

// url to app
var url = "http://amos-proj1.elasticbeanstalk.com/"

// append known fields to form
form.append("username", username);
form.append("password", password);


// Login
frisby.create('Get Request to Flask Intro Page, get Session Cookie and CSRF Token')
 	.get(url) // simple get request
	.expectBodyContains('Flask Intro') // expect "Flask Intro" in Body
	// use returned parameters for next test
 	.after(function(err, res, body) {
 		// parse session cookie
 		sessionCookie = res.headers['set-cookie'][0].split('session=')[1].split(';')[0]
 		console.dir("Cookie: " + sessionCookie)

 		// parse csrf token
 		csrf_token = body.split('csrf_token')[2].split("\">\n")[0].split("value=\"")[1] 
 		console.dir("csrf_token: " + csrf_token)
 		// append csrf token to form data
 		form.append("csrf_token", csrf_token);

		frisby.create('Login with Username/Password and retreived Cookie, Token')
			.post(url + 'login?next=%2F', // post request
				form,	// send form data
				{
					json: false, // disable json
					headers: { // set http header
						"referer":url + 'login?next=%2F',
						"cookie": "session="+sessionCookie,
						"connection": "keep-alive",
						"content-type": 'multipart/form-data; boundary=' + form.getBoundary(), //found in https://github.com/vlucas/frisby/blob/192d9f683928c0c988f43ea7ff6ec35efc15bca8/spec/frisby_httpbin_spec.js
						"content-length": form.getLengthSync()
					}
				})
			.expectBodyContains('Redirecting...') // expect a Redirect if Login succeeded
			.after(function(err, res, body) {
				// parse returned values for investigation
				console.log("POST /LOGIN ############")
				console.log("err:" + err)
				console.log("res:" + res)
				console.log("body:" + body)
			})		
		.toss()
	})
.toss();

// other tests
// use the sessionCookie in the header for authentification