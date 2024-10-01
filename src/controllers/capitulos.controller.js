const { Capitulo } = require('../models')
const controller = {}

const getCapitulosByTemporada = async (req, res) => {
    const temporadaId = req.params.idTempo
    const capitulos = await Capitulo.findAll({where: {temporadaId}})
    res.status(200).json(capitulos)
}

controller.getCapitulosByTemporada = getCapitulosByTemporada

module.exports = controller
