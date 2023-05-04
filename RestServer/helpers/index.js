const dbValidators = require('./db-validators')
const generarJWT = require('./generar-jwt')
const googleVerify = require('./google-verify')
const SubirArchivo = require('./Subir-Archivo')


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...SubirArchivo
}