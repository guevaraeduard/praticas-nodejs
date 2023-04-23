const validaRoles = require('../middlewares/validar-roles')
const validaJWT = require('../middlewares/validar-jwt')
const validaCampos = require('../middlewares/validar-campos')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}