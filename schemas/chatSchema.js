const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  num: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  // to: {
  //   type: String,
  //   require: true
  // },
  hour: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('chats', chatSchema)