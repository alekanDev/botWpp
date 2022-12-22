const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/router')
const {initSession} = require('./src/botWpp')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 9001

app.listen(PORT, () => {
    console.log(`server in port ${PORT}`)
})

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(router)

//conexion a mongoDB

mongoose.set({strictQuery: false})

mongoose
.connect(process.env.mongoURI)
.then(() => {
    console.log('Conected to mongoDB')
}).catch((err) => console.log(err))

initSession()
