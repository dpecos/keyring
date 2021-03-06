exports.config =
   server:
      secure: false
      host: 'localhost'
      port: 3000
      path: null
      db: 'sqlite'
   frontend_server:
      secure: false
      host: null
      port: null
      path: null
   mongo:
      host: 'localhost'
      port: 27017
      user: 'mongo'
      password: 'mongo'
      database: 'keyring'
   mysql:
      host: 'localhost'
      port: 3306
      user: 'keyring'
      password: 'keyring'
      database: 'keyring'
   sqlite:
      database: '/tmp/keyring.db'
