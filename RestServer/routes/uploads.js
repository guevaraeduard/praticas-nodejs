const { check } = require('express-validator')
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { mostrarImagen, cargarArchivo, actualizarImagen } = require('../controllers/uploadsController');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares');
const router = Router()


router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen)


router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;