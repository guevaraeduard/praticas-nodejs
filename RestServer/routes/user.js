const { Router } = require('express')
const { usuariosGet, usuariosPost } = require('../controllers/UserController')
const router = Router()

router.get('/', usuariosGet)
router.post('/', usuariosPost)

module.exports = router;