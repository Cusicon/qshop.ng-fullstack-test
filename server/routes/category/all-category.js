const { Router } = require('express')
const router = Router()

// --( MODELS )--
const Category = require('../../models/category')

// GET: all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean().exec()

    return res.json({
      ...global.jsonBag,
      message: 'Viewing all categories!',
      data: { ...categories },
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
