Localhost testing:

1. Get Chrome/Chrominium + Chromedriver
2. Start Chromedriver: ./chromedriver --port=4444 --url-base=wd/hub
3. Start functional test: ./tests/intern/bin/intern-runner.js config=tests/intern

Remote Testing:
1. Get Chrome/Chrominium + Chromedriver
2. Start Chromedriver: ./chromedriver --port=4444 --url-base=wd/hub
3. Edit /tests/intern.js 
3. Start functional test: ./tests/intern/bin/intern-runner.js config=tests/intern









