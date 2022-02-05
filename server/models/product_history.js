const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product_HistorySchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'products',
    },
    what_happened: {
      type: String,
      required: true,
    },
    modified_props: {
      type: Map,
      required: true,
    },
  },
  { timestamps: { currentTime: () => Date() } }
)

module.exports = mongoose.model('product_history', Product_HistorySchema)
