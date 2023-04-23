const { request, response } = require("express")






const esAdmin = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin el token '
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'No es administrador - No puede hacer esto '
        })
    }

    next()


}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin el token '
            })
        }


        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requier uno de estos roles: ${roles}`
            })
        }


        next()
    }

}


module.exports = {
    esAdmin,
    tieneRole
}