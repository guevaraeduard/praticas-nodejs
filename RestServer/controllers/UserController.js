const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { nombre = 'no name', page } = req.query

    res.json({
        nombre
    })
}

const usuariosPost = (req, res = response) => {
    const body = req.body
    res.json({
        msg: 'Eduard estamos enviando mjs',
        body
    })
}

module.exports = {
    usuariosGet,
    usuariosPost
}