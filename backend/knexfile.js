// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'estudo',
      user: "paulo",
      password: "123456789"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
