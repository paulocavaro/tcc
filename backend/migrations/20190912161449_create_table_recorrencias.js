
exports.up = function(knex, Promise) {
    return knex.schema.createTable('recorrencias', table => {
        table.increments('id').primary()
        table.string('horaInicio').notNull()
        table.integer('frequencia').notNull()
        table.string('dia').notNull()
        table.integer('idRemedio').references('id').inTable('remedios')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recorrencias')  
};
