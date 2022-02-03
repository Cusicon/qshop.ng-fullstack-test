const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// POST: add product
router.post('/', (req, res) => {
  return res.json({
    ...global.jsonBag,
    message: 'Added a product!',
    error: null,
    data: null,
  })
})

module.exports = router
