var path = require('path');

module.exports = {
  client: 'mysql',
  debug: false,
  connection: {
    host: 'localhost',
    database: 'kanban',
    user: 'kanban',
    password: 'k4nb4n'
  },
  migrations: {
    directory: path.join(__dirname, 'migrations')
  }
}