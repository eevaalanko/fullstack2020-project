const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteChallenge: {
    type: String,
  }
})

module.exports = mongoose.model('User', schema)