const { Router } = require('express')
const { usuariosGet, usuariosPost, usuarioPut, usuarioDelete } = require('../controllers/UserController')
const { check } = require('express-validator')
const router = Router()
const { esRolValido, emailExiste, ExisteusuarioID } = require('../helpers/db-validators')
const { validarCampos, validarJWT, esAdmin, tieneRole } = require('../middlewares')
router.get('/', usuariosGet)
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 letras').isLength({ min: 6 }),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteusuarioID),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteusuarioID),
    //esAdmin,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
], usuarioDelete)


module.exports = router;