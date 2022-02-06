const { Router } = require('express')
const router = Router()

// --( MODELS )--
const Product = require('../../models/product')

// DELETE: delete product
router.delete('/:id', async (req, res) => {
  const { id: prod_id } = req.params

  // Delete product
  try {
    let product = await Product.findByIdAndDelete(prod_id).lean().exec()

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
      message: 'Deleted a product!',
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
