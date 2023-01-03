const moment = require('moment')
const chatSchema = require('../schemas/chatSchema')

const { sendMessage, sendMedia } = require('../src/botWpp')


const hour = moment().format('HH:mm:ss')
const controller = {}

const newNumber = (to) => {
    const newNumber = `${to}@c.us`
    return newNumber
}

// router.put('/users/:username', (req, res) => {
//     const { username } = req.params
//     const { name, lastname, pass, email, phone, area, rol} = userSchema(req.body)
//     userSchema
//     .updateOne({ username:username }, {$set: { name, lastname, pass, email, phone, area, rol}})
//     .then((data) => res.json(data))
//     .catch((error) => res.json({message: error}))
// })

controller.findCreate = (req, res) => {
    const { num, state, body } = req.body
    const structure = chatSchema({ num, message: [{body, state, hour}]})

    // // save structure
    // structure.save()

    // // find structure
    // chatSchema.findOne({ num })

    // new message
    chatSchema.
    updateOne({ num }, { $push: { message: { state, body, hour }}})

    .then((data) => res.json(data))
    .catch((err) => res.json(err))

    // // send message from wpp
    // sendMessage(newNumber(num), body, state)
}

module.exports = controller