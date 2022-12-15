const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/router')
const {initSession} = require('./src/botWpp')

const app = express()
const PORT = 9001

app.listen(PORT, () => {
    console.log(`server in port ${PORT}`)
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(router)

initSession()
