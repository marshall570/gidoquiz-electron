const knex = require('knex')
const configs = require('../../knexfile')

const config = configs.development

const connection = knex(config)

module.exports = connection
