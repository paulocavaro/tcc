exports.up = function(knex, Promise) {
    return knex.schema.createTable('modulos', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('topico').notNull()
        table.string('topicoRetorno').notNull()
        table.integer('idUsuario').references('id').inTable('usuarios').notNull()
    })
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('modulos')
};