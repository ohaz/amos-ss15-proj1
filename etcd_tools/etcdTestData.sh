#!/bin/bash

curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1 -XPUT -d dir=True
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1/t11 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1/t12 -XPUT -d dir=True
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1/t12/t121 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1/t12/t122 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t1/t13 -XPUT -d value=test

curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2 -XPUT -d dir=True
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2/t21 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2/t22 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2/t23/ -XPUT -d dir=True
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2/t23/t231 -XPUT -d value=test
curl -L http://52.25.126.48:4001/v2/keys/registerUser/t2/t24 -XPUT -d value=test