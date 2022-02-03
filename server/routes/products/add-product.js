const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')
const Category = require('../../models/category')

// POST: add product
router.post(
  '/',
  body('title', 'title is important!').notEmpty().isString(),
  body('description', 'description is important!').notEmpty().isString(),
  body('price', 'input a price!').notEmpty().isFloat(),
  body('qty', 'enter its quantity!').notEmpty().isInt(),
  body('images', "select your product's image(s)!")
    .notEmpty()
    .custom((images) => {
      if (images[0].length <= 3)
        throw new Error('please, select at least 1 product image!')

      return images
    }),
  body('exp_date', 'expiry date is important!')
    .notEmpty()
    .isDate()
    .withMessage('please, select a valid date!'),
  body('category', 'select a category!').notEmpty().isString(),
  async (req, res) => {
    req.stringifyBody(req.body)

    const allowedBody = [
      'title',
      'description',
      'price',
      'qty',
      'images',
      'exp_date',
      'category',
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

    // Create Product
    try {
      const { category, title } = req.body
      let found_cat = await Category.findOne({ title: category }).lean('_id')
      let slug = title.replace(' ', '-')
      if (!found_cat) throw Error('please, select a valid category!')

      const newProduct = {
        ...req.body,
        slug: slug,
        user_id: req.user._id,
        category: found_cat._id,
      }

      await Product.create({ ...newProduct })

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
  }
)

module.exports = router
