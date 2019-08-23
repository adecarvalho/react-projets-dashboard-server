const mongoose = require("mongoose")

const SujetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Sujet", SujetSchema)
