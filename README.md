[![Build Status](https://travis-ci.org/dpecos/keyring.svg)](https://travis-ci.org/dpecos/keyring)

Preparing a new release
=======================

1. Close the feature branch

    1.1 Manually merge the branch into master:
   
        git merge <branch> --no-ff

    1.2 Create a pull request in github and merge it into master

2. Create a tag with the version to release in master

3. Deploy it to production
    
    pm2 deploy production

4. Create a new branch and switch into it

    git checkout -b release-1.x.0

5. Bump package.json version:

    npm version minor -m "Project version change to %s"


Setup
=====

Install server dependencies as global:

    npm install -d

This will install all dependencies. SQLite3 is built after download, so it requires in Ubuntu some extra packages:

    sudo apt-get install libsqlite3-dev build-essential

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
