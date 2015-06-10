var frisby = require('../intern/node_modules/frisby');
frisby.create('Login')
 .post('http://amos-proj1.elasticbeanstalk.com/login', {
	user: "user11",
	password: "password",
	})
	.expectBodyContains('Netto-Lohn')
.toss();