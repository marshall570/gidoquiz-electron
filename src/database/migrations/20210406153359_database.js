
exports.up = function (knex) {
    return knex.schema.createTable('perguntas', function (table) {
        // table.increments()
        table.integer('id').primary().notNullable()

        table.string('pergunta').notNullable()
        table.string('alt_a').notNullable()
        table.string('alt_b').notNullable()
        table.string('alt_c').notNullable()
        table.string('alt_d').notNullable()

        table.string('resposta').notNullable()
        
        table.string('equipe').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('perguntas')
}
