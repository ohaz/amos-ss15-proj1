#!/bin/sh

#update repositories
sudo apt-get update

#install java
sudo apt-get install -y openjdk-7-jre-headless

#fonts
sudo apt-get install -y xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic

sudo apt-get install -y xvfb

sudo apt-get install -y xserver-xorg-core

#install chrome und chrome-driver

wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -

sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update
sudo apt-get -y install google-chrome-stable

wget http://chromedriver.googlecode.com/files/chromedriver_linux64_23.0.1240.0.zip 
sudo apt-get -y install unzip
unzip chromedriver_linux64_23.0.1240.0.zip
sudo cp chromedriver /usr/local/bin

#get selenium server
wget http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar

#starting selenium server
Xvfb :99 -screen 0 1024x768x24 -ac 2>&1 >/dev/null &
export DISPLAY=:99

java -jar selenium-server-standalone-2.45.0.jar -port 8080 –maxSession 10

echo "Config of selenium server successfull..."




