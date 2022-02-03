const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrashSchema = new Schema(
  {
    document_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    which_collection: {
      type: String,
      required: true,
    },
  },
  { timestamps: { currentTime: () => Date() } }
)

module.exports = mongoose.model('trash', TrashSchema)
