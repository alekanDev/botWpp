const express = require('express')
const router = express.Router()

const controller = require('../controller/findCreate')

router.post('/sendMessage', controller.findCreate)

router.post('/sendMedia', (req, res) => {
    const {to, fileName} = req.body

    // sendMedia(newNumber(to), fileName)
    res.send({state: 'Media ok'})
})


module.exports = router