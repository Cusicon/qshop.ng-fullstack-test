const { Router } = require('express')
const router = Router()

// --( MODELS )--
const Product = require('../../models/product')

// GET: all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean().exec()

    return res.json({
      ...global.jsonBag,
      message: 'Viewing all products!',
      data: { ...products },
      error: null,
    })
  } catch (err) {
    return res.json({
      ...global.jsonBag,
      status: (res.statusCode = err.status || 500),
      error: {
        message: err.message,
        data: { ...err },
      },
      data: null,
    })
  }
})

module.exports = router
