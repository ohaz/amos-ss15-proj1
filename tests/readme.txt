Localhost testing:

1. Get Chrome/Chrominium + Chromedriver
2. Start Chromedriver: ./chromedriver --port=4444 --url-base=wd/hub
3. Start functional test: ./tests/intern/bin/intern-runner.js config=tests/intern

Remote Testing:
1. Get Chrome/Chrominium + Chromedriver
2. Start Chromedriver: ./chromedriver --port=4444 --url-base=wd/hub
3. Edit /tests/functional/*.js  -> .get(require.toUrl("XXX") bearbeiten
3. Start functional test: ./tests/intern/bin/intern-runner.js config=tests/intern


__________________________________________________

setup REST API testing:
sudo npm install -g jasmine-node

run tests in /tests/rest directory. Filenames must end with _spec.js:
amos-ss15-proj1/tests/rest$ jasmine-node .



Frisby api: http://frisbyjs.com/docs/api/
