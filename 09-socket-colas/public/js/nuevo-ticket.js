const socket = io();


//Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')

socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false
        //Notificar que hay un nuevo ticket pendiente

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true
});


socket.on('ultimo-ticket', (payload) => {

    lblNuevoTicket.innerText = 'Ticket ' + payload

})

btnCrear.addEventListener('click', () => {



    socket.emit('siguiente-tiket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    });

});