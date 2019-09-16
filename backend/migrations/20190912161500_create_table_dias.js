
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dias', table => {
        table.integer('idRecorrencia').references('id').inTable('recorrencias').primary()
        table.boolean('domingo').defaultTo(false)
        table.boolean('segunda').defaultTo(false)
        table.boolean('terca').defaultTo(false)
        table.boolean('quarta').defaultTo(false)
        table.boolean('quinta').defaultTo(false)
        table.boolean('sexta').defaultTo(false)
        table.boolean('sabado').defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dias')
};
