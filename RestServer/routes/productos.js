const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, validarJWT, esAdmin, tieneRole, iscategoria } = require('../middlewares')
const { existeProducto } = require('../helpers/db-validators')
const { obtenerProductos, crearProductos, obtenerProducto, actualizarProductos, borrarProductos } = require('../controllers/productosController')

const router = Router()

//Obtener todas las productos -- publico
router.get('/', obtenerProductos)

//Obtener una producto por id -- publico
router.get('/:id', [
    check('id').custom(existeProducto),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], obtenerProducto)

//Crear producto -privado- cualquiera persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    iscategoria,
    validarCampos
], crearProductos)

//Actualizar un registro -privado- cualquiera con un token valido
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProducto),
    validarJWT,
    validarCampos
], actualizarProductos)



//Eliminar una producto -Admin

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    //esAdmin,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
], borrarProductos)

module.exports = router;