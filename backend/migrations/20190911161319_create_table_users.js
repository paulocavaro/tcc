
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.string('login').primary()
        table.string('senha').notNull()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
