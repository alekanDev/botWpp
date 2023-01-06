const express = require('express')
const chatRouter = express.Router()

const { chats } = require('../controller/controllerChats')

chatRouter.post('/sendMessage', chats)

chatRouter.post('/sendMedia', (req, res) => {
    const {to, fileName} = req.body

    // sendMedia(newNumber(to), fileName)
    res.send({state: 'Media ok'})
})


module.exports = chatRouter