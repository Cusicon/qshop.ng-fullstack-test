const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')
const ProductHistory = require('../../models/product_history')

// PUT: edit product
router.put(
  '/:id',
  body('description', 'description is important!').notEmpty().isString(),
  body('price', 'input a price!').notEmpty().isFloat(),
  body('qty', 'enter its quantity!').notEmpty().isInt(),
  async (req, res) => {
    req.stringifyBody(req.body)

    const { id: prod_id } = req.params
    const allowedBody = ['description', 'price', 'qty']
    req.cleanBody(allowedBody)

    const errors = validationResult(req)

    // Checking for Errors
    if (!errors.isEmpty())
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 400),
        error: {
          message: "Hello? You've entered some invalid fields!",
          data: errors.array(),
        },
        data: null,
      })

    // Edit product
    try {
      let newUpdate = { ...req.body }
      let product = await Product.findByIdAndUpdate(prod_id, {
        ...newUpdate,
      })
        .lean()
        .exec()

      if (!product)
        return res.json({
          ...global.jsonBag,
          status: (res.statusCode = 401),
          message: 'Sorry, no product found!',
          error: null,
          data: null,
        })

      const { description, price, qty } = req.body
      let modified_props = { ...req.body }
      let what_happened = `Modified ${price ? `price: ${price},` : ''} ${
        qty ? `quantity: ${qty},` : ''
      } ${description ? `and description: ${description}` : ''}`

      let newProductHistory = {
        product_id: prod_id,
        what_happened,
        modified_props,
      }

      newProductHistory = JSON.parse(
        JSON.stringify(newProductHistory).toLowerCase()
      )

      await ProductHistory.create({ ...newProductHistory })

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
  }
)

module.exports = router
