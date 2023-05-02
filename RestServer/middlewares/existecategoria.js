const { request, response } = require("express")
const { Categoria } = require("../models");


const iscategoria = async(req = request, res = response, next) => {

    const { categoria } = req.body
    const nombre = categoria.toUpperCase()

    const nombrecategoria = await Categoria.findOne({ nombre })

    if (!nombrecategoria) {
        return res.status(400).json({
            msg: ` ${nombre} no es una categoria`
        })
    }

    if (!nombrecategoria.estado) {
        return res.status(400).json({
            msg: ` ${nombre} Esta CATEGORIA ESTA ELIMINADA`
        })
    }

    next()


}


module.exports = {
    iscategoria
}