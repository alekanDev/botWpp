const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/router')
const initSession = require('./src/botWpp')

const app = express()

app.listen(9090, () => {
    console.log('server in port 9090')
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(router)

initSession()
