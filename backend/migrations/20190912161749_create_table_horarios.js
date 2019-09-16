
exports.up = function(knex, Promise) {
    return knex.schema.createTable('horarios', table => {
        table.integer('idRecorrencia').references('id').inTable('recorrencias').primary()
        table.string('horario')
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('horarios')
};
