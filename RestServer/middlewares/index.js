const validaRoles = require('../middlewares/validar-roles')
const validaJWT = require('../middlewares/validar-jwt')
const validaCampos = require('../middlewares/validar-campos')
const categoriaexiste = require('../middlewares/existecategoria')
const validarArchivoSu = require('../middlewares/validar-archivo')
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...categoriaexiste,
    ...validarArchivoSu
}