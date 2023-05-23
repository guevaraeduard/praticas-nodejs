"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
const router = (0, express_1.Router)();
router.get('/', usuariosControllers_1.getUsuarios);
router.get('/:id', usuariosControllers_1.getUsuario);
router.post('/', usuariosControllers_1.postUsuario);
router.put('/:id', usuariosControllers_1.putUsuario);
router.delete('/:id', usuariosControllers_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map