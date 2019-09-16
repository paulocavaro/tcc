exports.up = function(knex, Promise) {
    return knex.schema.createTable('remedios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('estoque').notNull()
        table.integer('posicao').notNull()
        table.string('loginUsuario').references('login').inTable('usuarios')
        table.string('idModulo').references('id').inTable('modulos')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('remedios')
};
