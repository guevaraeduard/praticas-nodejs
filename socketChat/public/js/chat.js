

const txtUid     = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')  
const ulUsuarios = document.querySelector('#ulUsuarios')  
const ulMensajes = document.querySelector('#ulMensajes')  
const btnSalir   = document.querySelector('#btnSalir') 


let usuario = null
let socket = null
//Validar el JWT del localstorage
const validarJWT = async() =>{
    const token = localStorage.getItem('token') || ''

    if(token.length <= 10){
        window.location = 'index.html'
        throw new Error('No hay token en el servidor')
    }


    const resp = await fetch('http://localhost:8080/api/auth/', {
        headers: {
            'x-token': token
        }
    })

    const { usuario: userDB, token: tokenDB} = await resp.json()
    localStorage.setItem('token', tokenDB)
    usuario = userDB

    document.title = usuario.nombre

    await conectarSocket()
}

const conectarSocket = async()=>{

    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    })

    socket.on('connect', ()=>{
        console.log('conectado');
    })

    socket.on('disconnet', ()=>{
        console.log('desconectado');
    })

    socket.on('recibir-mensaje', dibujarMensajes)

    socket.on('usuarios-activos', dibujarUsuarios)

    socket.on('mensaje-privado', (payload)=>{
        console.log(payload);
    })



}


const dibujarUsuarios = (usuarios = [])=>{

    let userHtml = ''
    usuarios.forEach( ({nombre, uid}) =>{
        userHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
                
                
                
                </li>
        `;
    })

    ulUsuarios.innerHTML = userHtml

}


const dibujarMensajes = (mensajes = [])=>{

    let mjsHtml = ''
    mensajes.forEach( ({nombre, mjs}) =>{
        mjsHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}:</span>
                    <span class="fs-6 text-muted">${mjs}</span>
                </p>
                
                
                
                </li>
        `;
    })

    ulMensajes.innerHTML = mjsHtml

}




txtMensaje.addEventListener('keyup', ({keyCode})=>{
    const mensaje = txtMensaje.value
    const uid = txtUid.value
    if(keyCode !== 13){
        return
    }
    if(mensaje.length === 0){
        return
    }

    socket.emit('enviar-mensaje', {mensaje, uid})

    txtMensaje.value = ''


})


const main = async()=>{

    await validarJWT()

}

main()
