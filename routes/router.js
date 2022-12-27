const express = require('express')
const router = express.Router()
const { sendMessage, sendMedia } = require('../src/botWpp')
const chatSchema = require('../schemas/chatSchema')
const moment = require('moment')


const newNumber = (to) => {
    const newNumber = `${to}@c.us`
    return newNumber
}

router.post('/sendMessage', (req, res) => {
    const { _id, num, state, message } = req.body
    const hour = moment().format('HH:mm:ss')
    
    const data = chatSchema({ _id: _id, num: num, state: state, hour: hour, message: message})
    
    chatSchema
    .findOne({num})
    .then((data) => {
        sendMessage(newNumber(num), message, state)
        res.json({message: `Ya hay un chat existente con: ${data.num}`})
    })
    .catch(() => {
        data
        .save()
        res.json({message :`Se creo nuevo chat con ${data.num}`})
        sendMessage(newNumber(num), message)
    })


})

router.post('/sendMedia', (req, res) => {
    const {to, fileName} = req.body

    sendMedia(newNumber(to), fileName)
    res.send({state: 'Media ok'})
})


module.exports = router