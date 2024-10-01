const { Model } = require('sequelize')
const { Series, Temporada, Capitulo } = require('../models')
const series = require('../models/series')
const controller = {}

const getAllSeries = async (req, res) =>{
    const data = await Series.findAll({})
    res.status(200).json(data)
}
controller.getAllSeries = getAllSeries

const getSerieById= async (req, res)=>{
    const id = req.params.id
    const serie = await Series.findOne( {
        where: {id},
        include: {
            model: Temporada,
            as: 'seasons',
            include: {
                model: Capitulo,
                as: 'episodios'
            }
        }
    })
    res.status(200).json(serie)
}
controller.getSerieById = getSerieById

const deleteById = async (req, res) => {
    const idSerie = req.params.id
    const r = await Series.destroy( {where: {id:idSerie}})
    res.status(204).json({mensaje:  `filas afectados ${r}`})
}
controller.deleteById = deleteById

const createSerie = async (req, res) => {
    const {nombre, plataforma, disponible} = req.body
    const serie = await Series.create({
        nombre,
        plataforma,
        disponible
    })
    res.status(201).json(serie)
}
controller.createSerie = createSerie

const updateSerie = async (req, res) => {
    const {nombre, disponible, plataforma} = req.body
    const id = req.params.id
    const serie = await Series.findByPk(id)
    serie.nombre = nombre;
    serie.disponible = disponible;
    serie.plataforma = plataforma
    await serie.save()
    res.status(200).json(serie)
}
controller.updateSerie = updateSerie


module.exports = controller