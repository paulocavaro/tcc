//chama o knex e as configuracoes usadas pelo knex, faz o migrate.latest 
//para rodar os codigos para gerar as tabelas necessarias pelo projeto e exporta para o codigo main.js
const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config])

module.exports = knex