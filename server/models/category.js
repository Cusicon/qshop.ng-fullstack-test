const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: { currentTime: () => Date() } }
)

// Some model code...

module.exports = mongoose.model('category', CategorySchema)
