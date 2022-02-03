const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// POST: add product
const bodyValidation = (req, res, next) => {
  const __body =
    (body('title', 'title is important!').notEmpty().isString(),
    body('description', 'description is important!').notEmpty().isString(),
    body('price', 'input a price!').notEmpty().isFloat(),
    body('qty', 'enter its quantity!').notEmpty().isString(),
    body('images', "select your product's image(s)!").notEmpty().isString(),
    body('exp_date', 'expiry date is important!').notEmpty().isDate(),
    body('category_id', 'select a category!').notEmpty().isString())

  return __body
  next()
}

router.post('/', bodyValidation, async (req, res) => {
  req.stringifyBody(req.body)

  const allowedBody = [
    'title',
    'description',
    'price',
    'qty',
    'images',
    'exp_date',
    'category_id',
  ]
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

  // Edit Candidate
  try {
    return res.json({
      ...global.jsonBag,
      message: 'Added a product!',
      error: null,
      data: null,
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
