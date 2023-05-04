const { v4: uuidv4 } = require('uuid')
const path = require('path')

const subirArchivo = (files, extensionPermitdas = ['png', 'jpg'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        //Validar extension


        if (!extensionPermitdas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, las que se permiten son las siguientes ${extensionPermitdas}`)

        }


        const nombreTemp = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp)
        });

    })

}

module.exports = {
    subirArchivo
}