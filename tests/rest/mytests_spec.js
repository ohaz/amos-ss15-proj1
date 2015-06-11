var frisby = require('../intern/node_modules/frisby');



var sessionCookie
var csrf_token
var username = "user11"
var password = "password"

frisby.create('Login')
 	.get('http://amos-proj1.elasticbeanstalk.com/')
	.expectBodyContains('Flask Intro')
	.expectHeaderContains('Content-Type', 'text/html; charset=utf-8')
 	.after(function(err, res, body) {
 		console.log("DEBUG INFO ################")
 		console.log("err:" + err)
 		console.log("DEBUG INFO END ############")

 		sessionCookie = res.headers['set-cookie'][0].split('session=')[1].split(';')[0]
 		console.dir("Cookie: " + sessionCookie)
 		// TODO: parse token from body
 		csrf_token = "1434049211##6d13f3486e1e93a77468166e0f92fa0efcce1feb"
 		console.dir("csrf_token: " + csrf_token)

		frisby.create('Second test, run after first is completed')
			.post('/login?next=%2F',


/* get this to work, maybe with fromdata: https://github.com/vlucas/frisby/blob/master/examples/httpbin_multipart_spec.js
					headers: {
						"cookie": "session="+sessionCookie,
						"connection": "keep-alive",
					},
					data: {
						"csrf_token": csrf_token, 
						"username":username,
						"password":password
					}
*/

			.after(function(err, res, body) {
				console.log("POST /LOGIN ############")
				console.log("err:" + err)
				console.log("res:" + res)
				console.log("body:" + body)
			})		
		.toss()
	})
.toss();
