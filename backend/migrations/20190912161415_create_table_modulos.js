exports.up = function(knex, Promise) {
    return knex.schema.createTable('modulos', table => {
        table.string('id').primary()
        table.string('name').notNull()
        table.string('topico').notNull()
        table.string('topicoRetorno').notNull()
        table.integer('idUsuario').references('id').inTable('usuarios').notNull()
    })
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('modulos')
};
