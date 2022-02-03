const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Category = require('../../models/category')

// POST: add category
router.post(
  '/',
  body('title', 'title is important!').notEmpty().isString(),
  async (req, res) => {
    req.stringifyBody(req.body)

    const allowedBody = ['title']
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

    // Create Category
    try {
      const newCategory = { ...req.body, user_id: req.user.id }
      await Category.create({ ...newCategory })

      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 201),
        message: 'Added a category!',
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
