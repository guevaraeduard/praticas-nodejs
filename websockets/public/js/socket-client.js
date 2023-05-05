//Referencias del html

const online = document.querySelector('#online')
const offline = document.querySelector('#offline')
const mjs = document.querySelector('#mjs')
const enviar = document.querySelector('#enviar')



const socket = io()
    //Para estar escuchando algun evento
socket.on('connect', () => {
    //console.log('Conectado');
    offline.style.display = 'none'
    online.style.display = ''
})

socket.on('disconnect', () => {
    console.log('Desconectado');
    online.style.display = 'none'
    offline.style.display = ''
})

socket.on('enviar-mjs', (payload) => {
    console.log(payload);
})

enviar.addEventListener('click', () => {
    const mensaje = mjs.value

    const payload = {
        mensaje,
        id: '123',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mjs', payload)

})