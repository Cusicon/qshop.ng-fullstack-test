const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// GET: view product
router.get('/:slug', (req, res) => {
  return res.json({
    ...global.jsonBag,
    message: 'Viewing a product!',
    error: null,
    data: null,
  })
})

module.exports = router
