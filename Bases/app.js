const { crearArchivo } = require('./helpers/multiplicar');

//para limpiar la consola
console.clear();
//Tabla de multiplicar
const base = 5;

crearArchivo(base).then(nombreArchivo => console.log(nombreArchivo, 'creado')).catch(err => console.log(err));