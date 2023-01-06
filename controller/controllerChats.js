const moment = require('moment')
const chatSchema = require('../schemas/chatSchema')
const { sendMessage, sendMedia } = require('../src/botWpp')

// const chatController = {}
const hour = moment().format('HH:mm:ss')

const newNumber = (to) => {
    const newNumber = `${to}@c.us`
    return newNumber
}

chats = (req, res) => {
    const { num, state, body } = req.body
    const structure = chatSchema({ num, message: [{body, state, hour}]})
    
    chatSchema
    .findOne({ num })
    .then((data) => {
        if(data === null){
            structure.save()
            .then(() => res.json({message: 'dato creado'}))
        } else {
            chatSchema.
            updateOne({ num }, { $push: { message: { state, body, hour }}})
            .then(() => res.json({message: 'dato agregado'}))
        }

        // sendMessage(newNumber(num), body, state)
    })
    .catch((err) => res.json(err))
}

module.exports = { chats }