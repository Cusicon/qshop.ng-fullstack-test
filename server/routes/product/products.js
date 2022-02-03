const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// GET: all product
router.get('/', (req, res) => {
  return res.json({
    ...global.jsonBag,
    message: 'Viewing all product!',
    error: null,
    data: null,
  })
})

module.exports = router
