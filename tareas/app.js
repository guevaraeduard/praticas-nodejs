//const { mostrarMenu, pausa } = require('./helpers/mensajes');

require('colors');
const { inquirerMenu, pausa, leerInput, tareaborrar, confirmar, mostrarListadoCheck } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas');

console.clear();


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();


    if (tareaDB) { //Cargar tareas

        tareas.cargarTareasFromArray(tareaDB)

    }

    do {
        //  opt = await mostrarMenu();
        //console.log({ opt });
        //      if (opt !== '0') await pausa();

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendienteCompletadas(true);
                break;
            case '4':
                tareas.listarPendienteCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheck(tareas.listadoArr);
                tareas.toglleCompletadas(ids);
                console.log(ids);
                break;
            case '6':
                const id = await tareaborrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estas Seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente');

                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);
        await pausa();



    } while (opt !== '0');

}

main();