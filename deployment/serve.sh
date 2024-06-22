#!/bin/bash

sudo apt-get update
sudo apt-get upgrade 
sudo apt-get install nginx
sudo ufw enable
sudo ufw allow  'Nginx HTTP'
sudo ufw allow  'Nginx HTTPS'
sudo ufw allow  'Nginx FULL'
sudo ufw allow 'OpenSSH'
sudo systemctl status nginx
sudo apt-get install npm 
npm install -g npm@latest
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install pm2 -g
cp api.cyntax.org ~/../etc/nginx/sites-available/
sudo ln -s ~/../etc/nginx/sites-available/api.cyntax.org ~/../etc/nginx/sites-enabled/
nginx -t
sudo systemctl restart nginx
cd ~/share-server-backend
npm i
pm2 start app.js --name share-server-api --env "{ \"MONGO_DB_USER\": \"MONGO_DB_USERNAME\", \"MONGO_DB_PW\": \"MONGO_DB_PW\" }"




