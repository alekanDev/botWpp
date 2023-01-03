const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  num: {
    type: String,
    unique: true,
    require: true
  },
  message: {
    type: Array,
    require: true,
    body: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    },
    hour: {
      type: String,
      require: true
    }
  }
},
{
  versionKey: false
})

module.exports = mongoose.model('chats', chatSchema)