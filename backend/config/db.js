const config = require('../knexfile.js')
const knex = require('knex')(config)

knes.migrate.latest([config])

module.exports = knex