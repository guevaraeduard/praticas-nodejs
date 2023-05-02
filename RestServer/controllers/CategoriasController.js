const { response } = require("express");
const { Categoria } = require("../models");


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //Guardar DB

    await categoria.save()

    res.status(201).json(categoria)

}

//obtenerCategorias --paginado -- total --populate
const obtenerCategorias = async(req = request, res = response) => {


        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true }
        const [total, categorias] = await
        Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))


        ])
        res.json({
            total,
            categorias
        })
    }
    //obtenercategoria --populate {}
const obtenercategoria = async(req = request, res = response) => {

        const { id } = req.params



        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        res.json({
            categoria
        })

    }
    //actualizarCategoria
const actualizarCategoria = async(req = request, res = response) => {

        const { id } = req.params

        const { estado, usuario, ...data } = req.body;

        //Validar contra base de datos
        data.nombre = data.nombre.toUpperCase()

        data.usuario = req.usuario_id

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

        res.json({
            categoria
        })

    }
    //borrarCategoria --cambiando el estado
const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params
        //Fisicamente
        // const usuario = await Usuario.findByIdAndDelete(id)
        //Cambiando el estado
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
        //const usuarioAutendticado = req.usuario
    res.json({
        categoria,

    })
}

module.exports = {
    crearCategoria,
    actualizarCategoria,
    obtenerCategorias,
    borrarCategoria,
    obtenercategoria
}