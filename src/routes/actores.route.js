const { Router } = require('express')
const actoresController = require('../controllers/actores.controller')

const route = Router()

route.get('/actor/:id', actoresController.getActorById )

module.exports = route