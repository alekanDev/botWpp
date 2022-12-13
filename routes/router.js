const express = require('express')
const router = express.Router()
const { sendMessage } = require('../src/botWpp')

router.post('/send', (req, res) => {
    const { message, to } = req.body
    const newNumber = `${to}@c.us`
    console.log(`para ${newNumber}: ${message}`)

    sendMessage(newNumber, message)
    res.send({State: 'Enviado'})
})


module.exports = router