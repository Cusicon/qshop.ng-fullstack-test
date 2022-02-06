const { Router } = require('express')
const router = Router()

// --( MODELS )--
const Product = require('../../models/product')
const Category = require('../../models/category')

// GET: single products
router.get('/:slug', async (req, res) => {
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

    let cat = await Category.findById(product.category).lean('title').exec()
    product.category = cat.title.split('-').join(' ')

    return res.json({
      ...global.jsonBag,
      message: 'Viewing a product!',
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
