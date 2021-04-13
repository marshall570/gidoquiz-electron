const express = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const routes = express.Router()

const game_controller = require('./controller/game_controller') 

routes.get('/total', game_controller.total)

routes.get('/game', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        qid: Joi.number().min(1)
    })
}), game_controller.select)

routes.post('/game', celebrate({
    [Segments.BODY]: Joi.object().keys({
        pergunta: Joi.string().required(),
        alt_a: Joi.string().required(),
        alt_b: Joi.string().required(),
        alt_c: Joi.string().required(),
        alt_d: Joi.string().required(),
        resposta: Joi.string().required(),
        equipe: Joi.string().required()
    })
}), game_controller.insert)

routes.delete('/nuke', game_controller.nuke)
routes.get('/questions', game_controller.select_all)

module.exports = routes
