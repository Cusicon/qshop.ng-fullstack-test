const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')
const Category = require('../../models/category')

// PUT: all products
router.put('/:slug', async (req, res) => {
  const { slug } = req.params

  try {
    let product = await Product.findOne({ slug }).lean().exec()

    if (!product)
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 401),
        message: 'Sorry, no product found!',
        error: null,
        data: null,
      })

    return res.json({
      ...global.jsonBag,
      message: 'Updated a product!',
      data: { ...product },
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
