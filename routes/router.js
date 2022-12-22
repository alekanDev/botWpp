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
    const { _id, num, to, message } = req.body
    const hour = moment().format('HH:mm:ss')
    
    sendMessage(newNumber(to), message)
    
    const data = chatSchema({ _id: _id, num: num, message: `${to} [${hour}]: ${message}`})
    
    console.log(data)
    
    chatSchema
    .findOne({num}, (err, docs) => {
        if (!err){
            //     console.log(err)
            // }else{
            console.log("Result : ", docs)
        }
    });

    // console.log(result)
    // if(result === id){
    //     console.log('objeto encontrado')
    // }else{
    //     console.log('objeto NO encontrado')
    // }

    // chatSchema
    // .find({id:id})
    // .then((data) => res.json(data))
    // .catch((err) => res.json({message: 'no encontrao'}))

    // salvar informacion en db
    // if(chatSchema.findOne({id: id})){
    //     res.send(data)
    // }else{
    //     res.send('chat no encontrado')
    // }
    // data
    // .save()
    // .then(res.send({message: 'chat creado...'}))

})

router.post('/sendMedia', (req, res) => {
    const {to, fileName} = req.body

    sendMedia(newNumber(to), fileName)
    res.send({state: 'Media ok'})
})


module.exports = router