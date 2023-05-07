const path = require('path')
const fs = require('fs')

class Tiket {

    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}



class TiketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tikets = []
        this.ultimos4 = []
        this.init()
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tikets: this.tikets,
            ultimos4: this.ultimos4
        }

    }

    init() {
        const { hoy, ultimo, ultimos4, tikets } = require('../db/data.json')
        if (hoy == this.hoy) {
            this.tikets = tikets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        } else {
            this.guardarDB()
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json')
            //para convertir un string, o equivalente a un json
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1
        const tiket = new Tiket(this.ultimo, null)
        this.tikets.push(tiket)
        this.guardarDB()
        return 'Ticket ' + tiket.numero
    }

    atenderTiket(escritorio) {
        if (this.tikets.length === 0) {
            return null
        }

        const tiket = this.tikets[0]
            //Elimina el primer elemento de un arreglo
        const ticket = this.tikets.shift()

        ticket.escritorio = escritorio
            //Añade un elemento al arreglo al inicio
        this.ultimos4.unshift(tiket)

        if (this.ultimo.length > 4) {
            this.ultimos4.slice(-1, 1)
        }
        this.guardarDB()

        return ticket







    }
}


module.exports = TiketControl