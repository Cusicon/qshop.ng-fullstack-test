const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// PUT: update product
router.put('/:id', (req, res) => {
  return res.json({
    ...global.jsonBag,
    message: 'Updated a product!',
    error: null,
    data: null,
  })
})

module.exports = router
