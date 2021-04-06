const express = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const routes = express.Router()

const game_controller = require('./controller/game_controller') 

routes.get('/game', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        qid: Joi.number().min(1)
    })
}), game_controller.select)

routes.get('/total', game_controller.total)

module.exports = routes