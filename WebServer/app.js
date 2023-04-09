require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;
const hbs = require('hbs');

app.set('view engine', 'hbs');
//Servir contenido estatico

hbs.registerPartials(__dirname + '/views/divicion');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home', {
        nombre: 'Eduard Guevara',
        titulo: 'Renderizando'
    })
})


app.get('/elements', function(req, res) {
    res.render('elements', {
        nombre: 'Eduard Guevara',
        titulo: 'Renderizando'
    })
})

app.get('/generic', function(req, res) {
    res.render('generic', {
        nombre: 'Eduard Guevara',
        titulo: 'Renderizando'
    })
})

app.listen(port, () => {
    console.log('Corriendo servidor');
})