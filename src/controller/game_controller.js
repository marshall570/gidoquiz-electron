const connection = require('../database/connection')

module.exports = {
    async select(request, response) {
        const { qid } = request.query

        const question = await connection('perguntas')
            .where('id', qid)
            .select('pergunta', 'alt_a', 'alt_b', 'alt_c', 'alt_d', 'resposta', 'equipe')

        return response.json(question)
    },

    async total(request, response) {
        const [{ total }] = await connection('perguntas').count('id', { as: 'total' })

        return response.json({ total_perguntas: total })
    }
}