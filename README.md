Setup
=====

Install server dependencies as global:

    npm install -d

Mongodb
=======

Default configuration requires an authenticated connection to mongodb. To configure proper user and password, you have to edit config.coffee file.

Otherwise if you want to use an anonymous connection, just set to null user and password settings in config.coffee file.

NOTE: To setup a user in mongodb, you should follow these steps:

1. mongodb --dbpath pathToDB 
2. mongo localhost/admin
    1. db.addUser('admin', 'passwd'); // this is the admin user; not required if you previously set up one
    2. db.auth('admin', 'passwd');
    3. use keyring;
    4. db.addUser('mongo', 'mongo');
3. mongodb --dbpath pathToDB --auth

Launch
======

    NODE_ENV=production node app.js

Open your browser using these URLs:

* Keyring: http://localhost:3000/
* Tests: http://localhost:3000/run-tests.html
