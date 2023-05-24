const { Usuarios } = require("../classes/usuarios");
const { io } = require("../server");
const { crearMensaje } = require("../utils/utilidades");
const usuarios = new Usuarios();

io.on('connection', (client) => {
  client.on('entrarChat', (data, callback) => {
    if (!data.nombre || !data.sala) {
      return callback({
        error: true,
        mensaje: "El nombre/sala es necesario",
      });
    }

    client.join(data.sala)

    usuarios.agregarPersona(client.id, data.nombre, data.sala);
   
    client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala))
    client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unio`) )
   
     callback(usuarios.getPersonasPorSala(data.sala));
  });

  client.on('crearMensaje', (data, callback)=>{
    
    let persona = usuarios.getPersona(client.id)
    
    let mensaje = crearMensaje(persona.nombre, data.mensaje)

    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    callback(mensaje);

  })

  client.on('disconnect', ()=>{
    let personaBorrada = usuarios.borrarPersona(client.id)
    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salio`) )

    client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala))

    //Mensaje privado

    client.on('mensajePrivado', data =>{
        
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))

    })




























})

});
