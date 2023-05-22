class Mensaje{
    constructor(uid, nombre, mjs){
        this.uid = uid,
        this.nombre = nombre,
        this.mjs = mjs
    }
}

class ChatMensajes {


    constructor(){
        this.mensajes = []
        this.usuarios = {

        }
    }

    get ultimos10(){
        this.mensajes = this.mensajes.splice(0,10)
        return this.mensajes
    }

    get usuariosArr(){
        return Object.values(this.usuarios)
    }

    enviarMensaje(uid, nombre, mjs){
        this.mensajes.unshift(
            new Mensaje(uid, nombre, mjs)
        )
    }

    conectarUsuario(usuario){

        this.usuarios[usuario.id] = usuario

    }

    desconectarUsuario(id){
        delete this.usuarios[id]
    }








}



module.exports = ChatMensajes