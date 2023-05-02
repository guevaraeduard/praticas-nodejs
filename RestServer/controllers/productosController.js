const { response } = require("express");
const { Producto, Categoria } = require("../models");


const crearProductos = async(req, res = response) => {

    const { categoria, ...datos } = req.body
    const nombre = categoria.toUpperCase()

    const nombrecategoria = await Categoria.findOne({ nombre })

    const data = {
        nombre: datos.nombre,
        usuario: req.usuario._id,
        precio: datos.precio,
        categoria: nombrecategoria.id,
        descripcion: datos.descripcion
    }

    const producto = new Producto(data)

    //Guardar DB

    await producto.save()

    res.status(201).json(producto)

}

//obtenerProductoss --paginado -- total --populate
const obtenerProductos = async(req = request, res = response) => {


        const { limite = 5, desde = 0 } = req.query
        const query = { estado: true }
        const [total, productos] = await
        Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))


        ])
        res.json({
            total,
            productos
        })
    }
    //obtenerProductos --populate {}
const obtenerProducto = async(req = request, res = response) => {

        const { id } = req.params

        const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

        res.json({
            producto
        })

    }
    //actualizarProductos
const actualizarProductos = async(req = request, res = response) => {

        const { id } = req.params

        const { estado, usuario, ...data } = req.body;

        if (data.categoria) {
            const nombre = data.categoria.toUpperCase()

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

            data.categoria = nombrecategoria.id

        }
        //Validar contra base de datos

        data.usuario = req.usuario_id

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre').populate('categoria', 'nombre')

        res.json({
            producto
        })

    }
    //borrarProductos --cambiando el estado
const borrarProductos = async(req = request, res = response) => {
    const { id } = req.params
        //Fisicamente
        // const usuario = await Usuario.findByIdAndDelete(id)
        //Cambiando el estado
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
        //const usuarioAutendticado = req.usuario
    res.json({
        producto,

    })
}

module.exports = {
    crearProductos,
    actualizarProductos,
    obtenerProducto,
    borrarProductos,
    obtenerProductos
}