const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
  num: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  company: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('contacts', contactSchema)