const { response } = require("express");
const { subirArchivo } = require('../helpers/Subir-Archivo');
const { Usuario, Producto } = require("../models");
const path = require("path");
const fs = require('fs')

const cargarArchivo = async(req, res = response) => {

    try {
        //primer argumento el archivo q se sube, el segundo las extenciones permitidas y el tercero la carpeta en donde se guardaran
        const nombre = await subirArchivo(req.files, ['txt', 'pdf'], 'textos')

        res.json({
            nombre
        })

    } catch (msg) {
        res.status(400).json({ msg })
    }




}


const actualizarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id)

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':

            modelo = await Producto.findById(id)

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: `Esto no esta validado ${coleccion}` });
    }



    //Limpiar imagenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor

        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }



    const nombre = await subirArchivo(req.files, undefined, coleccion)

    modelo.img = nombre

    await modelo.save();

    res.json({
        modelo
    })



}


const mostrarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id)

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':

            modelo = await Producto.findById(id)

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: `Esto no esta validado ${coleccion}` });
    }



    //Limpiar imagenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor

        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const imgNofund = path.join(__dirname, '../assets', 'no-image.jpg')
    return res.sendFile(imgNofund)

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}