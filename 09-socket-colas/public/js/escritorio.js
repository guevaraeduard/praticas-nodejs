const lblescritorio = document.querySelector('h1')
const btnatender = document.querySelector('button')
const lblticket = document.querySelector('small')
const divalerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

divalerta.style.display = 'none'

const escritorio = searchParams.get('escritorio')
lblescritorio.innerText = escritorio


const socket = io()
socket.on('connect', () => {
    // console.log('Conectado');

    btnatender.disabled = false
        //Notificar que hay un nuevo ticket pendiente

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnatender.disabled = true
});


socket.on('tikets-pendientes', (payload) => {

    if (payload === 0) {
        lblPendientes.style.display = 'none'

    } else {
        lblPendientes.style.display = ''

        lblPendientes.innerText = payload
    }

})

btnatender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblticket.innerText = 'Nadie'

            return divalerta.style.display = ''
        }
        lblticket.innerText = 'Ticket ' + ticket.numero
    });

});