const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = async(req = request, res = response) => {

    //const { nombre = 'no name', page } = req.query

    const { limite = 5, desde = 0 } = req.query
    const usuarios = await Usuario.find().limit(Number(limite)).skip(Number(desde))

    res.json({
        usuarios,
    })
}

const usuariosPost = async(req = request, res = response) => {


    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
        //ENcriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
        //Guardar BD
    await usuario.save()

    res.json({
        usuario
    })
}

const usuarioPut = async(req = request, res = response) => {

    const { id } = req.params

    const { _id, password, google, correo, ...resto } = req.body;

    //Validar contra base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })

}

const usuarioDelete = async(req = request, res = response) => {
    const { id } = req.params
        //Fisicamente
        // const usuario = await Usuario.findByIdAndDelete(id)
        //Cambiando el estado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
        //const usuarioAutendticado = req.usuario
    res.json({
        usuario,

    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}