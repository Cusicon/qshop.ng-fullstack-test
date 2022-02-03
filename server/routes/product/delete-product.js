const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const Product = require('../../models/product')

// DELETE: delete product
router.delete('/:id', (req, res) => {
  return res.json({
    ...global.jsonBag,
    message: 'Deleted a product!',
    error: null,
    data: null,
  })
})

module.exports = router
