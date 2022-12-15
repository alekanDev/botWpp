const express = require('express')
const router = express.Router()
const { sendMessage, sendMedia } = require('../src/botWpp')

const newNumber = (to) => {
    const newNumber = `${to}@c.us`
    return newNumber
}

router.post('/sendMessage', (req, res) => {
    const { to, message } = req.body

    sendMessage(newNumber(to), message)
    res.send({ State: 'Enviado' })
})

router.post('/sendMedia', (req, res) => {
    const {to, fileName} = req.body

    sendMedia(newNumber(to), fileName)
    res.send({state: 'Media ok'})
})


module.exports = router