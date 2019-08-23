const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  sujetId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  remarque: {
    type: String,
    default: ""
  },
  visa: {
    type: Boolean,
    default: false
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Post", PostSchema)
