const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, validarJWT, esAdmin, tieneRole } = require('../middlewares')
const { obtenercategoria, crearCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/CategoriasController')
const { esRolValido, emailExiste, ExisteusuarioID, existeCategoria } = require('../helpers/db-validators')

const router = Router()

//Obtener todas las categorias -- publico
router.get('/', obtenerCategorias)

//Obtener una categoria por id -- publico
router.get('/:id', [
    check('id').custom(existeCategoria),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], obtenercategoria)

//Crear categoria -privado- cualquiera persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar un registro -privado- cualquiera con un token valido
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarJWT,
    validarCampos
], actualizarCategoria)



//Eliminar una categoria -Admin

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    //esAdmin,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
], borrarCategoria)

module.exports = router;