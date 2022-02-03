const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sub_categories: [
      {
        type: String,
      },
    ],
  },
  { timestamps: { currentTime: () => Date() } }
)

// Some model code...

module.exports = mongoose.model('category', CategorySchema)
