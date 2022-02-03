const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  { timestamps: { currentTime: () => Date() } }
)

// Some model code...

module.exports = mongoose.model('category', CategorySchema)
