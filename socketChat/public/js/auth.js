const miformulario = document.querySelector('form')

miformulario.addEventListener('submit', ev =>{
    ev.preventDefault()
    const formData = {}
    for(let el of miformulario){
        if(el.namespaceURI.length > 0){
            formData[el.name] = el.value
        }
    }

    fetch('http://localhost:8080/api/auth/' + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json()).then(({msg, token})  =>{
        if(msg){
            return console.error(msg);
        }
        localStorage.setItem('token', token)
        window.location = 'chat.html'
    }).catch(err => {
        console.log(err);
    })

})


function handleCredentialResponse(response) {
    //Goggle token
    //console.log('id_token', response.credential);
    const body = {
        id_token: response.credential
    }

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json()).then(({token})=>{
        localStorage.setItem('token',token);
        window.location = 'chat.html'
    }).catch(console.log)

}
/*function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}
*/
const button = document.getElementById('signout')
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear()
        location.reload()
    })
}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        