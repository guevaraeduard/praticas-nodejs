const validaRoles = require('../middlewares/validar-roles')
const validaJWT = require('../middlewares/validar-jwt')
const validaCampos = require('../middlewares/validar-campos')
const categoriaexiste = require('../middlewares/existecategoria')
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...categoriaexiste
}