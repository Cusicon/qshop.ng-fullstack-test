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

      // Check for changes
      const { description, price, qty } = req.body
      const modified_props = { ...req.body }
      const {
        description: prev_description,
        price: prev_price,
        qty: prev_qty,
      } = product

      if (description == prev_description) delete modified_props.description
      if (price == prev_price) delete modified_props.price
      if (qty == prev_qty) delete modified_props.qty

      const {
        description: m_description,
        price: m_price,
        qty: m_qty,
      } = modified_props

      let what_happened = modified_props[0]
        ? happened_msg(m_price, m_qty, m_description)
        : 'Nothing was modified!'

      let newProductHistory = {
        product_id: prod_id,
        what_happened: what_happened.trim(),
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

    function happened_msg(m_price, m_qty, m_description) {
      return `Modified ${m_price ? `price: ${m_price} ` : ''}${
        m_qty ? `quantity: ${m_qty} ` : ''
      }${m_description ? `description: ${m_description}` : ''}`
    }
  }
)

// GET: product modification history
router.get('/:id/history', async (req, res) => {
  const { id: product_id } = req.params

  try {
    let product_histories = (
      await ProductHistory.find({ product_id }).lean().exec()
    ).reverse()

    if (!product_histories)
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 401),
        message: "Sorry, product's history not found!",
        error: null,
        data: null,
      })

    return res.json({
      ...global.jsonBag,
      message: "Viewing all product's history!",
      data: { ...product_histories },
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
