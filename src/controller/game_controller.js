const connection = require('../database/connection')

module.exports = {
    async insert(request, response) {
        const { pergunta, alt_a, alt_b, alt_c, alt_d, resposta, equipe } = request.body

        await connection('perguntas').insert({
            pergunta,
            alt_a,
            alt_b,
            alt_c,
            alt_d,
            resposta,
            equipe
        })

        return response.status(201).send()
    },

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
    },

    async nuke(request, response) {
        await connection('perguntas').truncate()

        return response.status(204).send()
    },

    async select_all(request, response) {
        const question = await connection('perguntas').select('*')
        return response.json(question)
    }
}
