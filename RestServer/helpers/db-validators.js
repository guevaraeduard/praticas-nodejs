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

module.exports = {
    esRolValido,
    emailExiste,
    ExisteusuarioID
}