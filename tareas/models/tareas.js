const Tarea = require("./tarea");

class Tareas {

    _listado = {}

    get listadoArr() {

        const lsitado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            lsitado.push(tarea);
        })

        return lsitado;

    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }


    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        console.log('\n');
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`);

        })
    }

    listarPendienteCompletadas(completadas) {

        console.log('\n');
        let cont = 0;
        this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red

            if ((completadoEn) && completadas) {
                cont += 1
                console.log(`${(cont + '.').green} ${desc} :: ${completadoEn.green}`);
            }
            if (!(completadoEn) && !completadas) {
                cont += 1
                console.log(`${(cont + '.').green} ${desc} :: ${estado}`);

            }

        })

    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }


    toglleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;

            }
        })

    }

}

module.exports = Tareas;