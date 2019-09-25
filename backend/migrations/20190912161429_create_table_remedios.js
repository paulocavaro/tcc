exports.up = function(knex, Promise) {
    return knex.schema.createTable('remedios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('estoque').notNull()
        table.integer('posicao').notNull()
        table.integer('idUsuario').references('id').inTable('usuarios').notNull()
        table.string('idModulo').references('id').inTable('modulos').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('remedios')
};
