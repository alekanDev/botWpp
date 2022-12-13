const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

// Servidor api
// const express = require('express')
// const cors = require('cors')
// const app = express()

// app.listen(9090, () => {
//     console.log('server in port 9090')
// })

// app.use(cors())
// app.use(express.urlencoded({ extended: true }))

// app.post('/send', (req, res) => {
//     const { message, to } = req.body
//     const newNumber = `${to}@c.us`
//     console.log(`para ${newNumber}: ${message}`)

//     sendMessage(newNumber, message)
//     res.send({State: 'Enviado'})
// })

// Final del Servidor api

let client

const initSession = () => {
    client = new Client({
        authStrategy: new LocalAuth({
            session: {}
        })
    })

    client.on('qr', (qr) =>{
        qrcode.generate(qr, {small: true})
    })

    client.on('ready', () => {
        console.log('Conexión con wpp is OK')
    })
    
    listenMessages()

    client.initialize()
}

const listenMessages = () => {
    client.on('message', (msg) => {
        const { from, to, body } = msg
        console.log(`de ${ from }: ${ body }`)

        switch(body){
            case 'Test':
                sendMessage(from, 'Respuesta a Test')
        }
    })
}

const sendMessage = (to, message) => {
    client.sendMessage(to, message)
    console.log(`para ${to}: ${message}`)
}



module.exports = initSession