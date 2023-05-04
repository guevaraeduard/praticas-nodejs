const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`Este correo ${correo} ya existe`)

    }

}

const ExisteusuarioID = async(id) => {
    //Verificar si el existe el usuario
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)

    }

}

const existeCategoria = async(id) => {
    //Verificar si el existe el usuario
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`)

    }

}

const existeProducto = async(id) => {
    //Verificar si el existe el usuario
    const existeproducto = await Producto.findById(id)
    if (!existeproducto) {
        throw new Error(`El id no existe ${id}`)

    }

}

//Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, las colecciones permitidas son: ${colecciones}`)

    }

    return true

}

module.exports = {
    esRolValido,
    emailExiste,
    ExisteusuarioID,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}