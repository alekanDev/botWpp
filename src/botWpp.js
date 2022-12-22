const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const moment = require('moment')
const mongoose = require('mongoose')
const fetch = require('node-fetch')

const date = moment().format('MMMM Do YYYY')
const hour = moment().format('HH:mm:ss')
const PATH_CHATS = './chats'

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

const sendMessage = (to, message) => {    
    client.sendMessage(to, message)

    console.log(`${ to } [${ hour }]: ${ message }`)
}

const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./mediaSend/${file}`)
    client.sendMessage(to, mediaFile)
}

const listenDB = (to, message) => {
    fetch('localhost:9001/sendMessage', {
        method: 'POST',
        body: {"to": to, "message": message}
    })
}

const listenMessages = () => {
    client.on('message', (msg) => {
        const { from, to, body } = msg

        console.log(`${ to } [${ hour }]: ${ body }`)
        listenDB(to, message)
        
        switch(body){
            case 'Test':
                sendMessage(from, 'Respuesta a Test')
                break
            case 'Info':
                sendMedia(from, 'constitucion.pdf')
                break
        }
    })
}

module.exports = { initSession, sendMessage, sendMedia }