// curl version:
// curl -X POST -H "Content-Type: application/json" http://amos-proj1.elasticbeanstalk.com/storage/api/v1.0/2/testfile -d '{"format": "json", "content":"testpla"}' -H 'Cookie:session=.eJw9j01rg0AYhP_K8p5DD6ZeFnJoiREDuyZFXXZLELWv8Wu1uIY0G_zvtW3oaRgYnpm5Q1p2manQAH2_A5n-JAcKuUhs4ex6ddxsYF7BocPMIOmGM6l7Mg0kKwo0hkxVbchndsYnOM2n1QIc0VRAp_GCi6s_gD6IzLZXpaWrhPfFmletIu-ZRS-ujGLLt_tWbd808wNHCvnbWJixTKehxf4foSJ2U_6-DZc495MqFLEbiuAqm12tRNJw61lugzWz8U2KeB36vJaPAyNq1DmOqUagZdaZZd7FLP5nIjgwfwPf61eX.CHGTbg.T8ZkiF101v__-hjljzAE8sWXH9U'

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
frisby.create('Login')
 	.get(url) // simple get request
	.expectBodyContains('Flask Intro') // expect "Flask Intro" in Body
	// use returned parameters for next test
 	.after(function(err, res, body) {
 		// parse session cookie
 		sessionCookie = res.headers['set-cookie'][0].split(';')[0]
 		//console.dir("Cookie: " + sessionCookie)

 		// parse csrf token
 		csrf_token = body.split('csrf_token')[2].split("\">\n")[0].split("value=\"")[1] 
 		//console.dir("csrf_token: " + csrf_token)
 		// append csrf token to form data
 		form.append("csrf_token", csrf_token);

		frisby.create('Login with Username/Password and retreived Cookie, Token')
			.post(url + 'login?next=%2F', // post request
				form,	// send form data
				{
					json: false, // disable json
					headers: { // set http header
						"referer":url + 'login?next=%2F',
						"cookie": sessionCookie,
						"connection": "keep-alive",
						"content-type": 'multipart/form-data; boundary=' + form.getBoundary(), //found in https://github.com/vlucas/frisby/blob/192d9f683928c0c988f43ea7ff6ec35efc15bca8/spec/frisby_httpbin_spec.js
						"content-length": form.getLengthSync()
					}
				})
			.expectBodyContains('Redirecting...') // expect a Redirect if Login succeeded
			.after(function(err, res, body) {
			    /* include auth token in the header of all future requests */
			    frisby.globalSetup({
			    	request: { 
			    	headers: {
			    		"accept": "*/*",
			    		'Cookie': sessionCookie
			    		}
			    	}
			    });


				frisby.create('Test for storage API: rest_upload_from_text')
					// post data
					.post(url + 'storage/api/v1.0/2/testfile', { // post request
					//.post('http://postcatcher.in/catchers/558ffa67ca2eab03000015aa', { // post request to analysis site
						content: "testpla"
					},
				    {
				        json: true
				    })
					.expectBodyContains('200') // expect a return of 200
				.toss()
			})	
		.toss() 
	})
.toss();
