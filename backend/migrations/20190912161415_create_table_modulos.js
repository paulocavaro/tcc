exports.up = function(knex, Promise) {
    return knex.schema.createTable('modulos', table => {
        table.string('id').primary()
        table.string('name').notNull()
        table.string('topico').notNull()
        table.string('topicoRetorno').notNull()
        table.string('loginUsuario').references('login').inTable('usuarios')
    })
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('modulos')
};
