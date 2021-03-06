const { Router } = require('express')
const router = Router()

// --( MODELS )--
const Product = require('../../models/product')
const Category = require('../../models/category')

// GET: all products
router.get('/', async (req, res) => {
  try {
    let products = (await Product.find().lean().exec()).reverse()
    let u_products = []

    if (!products)
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 401),
        message: 'Sorry, products not found!',
        error: null,
        data: null,
      })

    for (const prod of products) {
      let cat = await Category.findById(prod.category).lean('title').exec()
      prod.category = cat.title.split('-').join(' ')
      u_products.push(prod)
    }

    products = [...u_products]

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
