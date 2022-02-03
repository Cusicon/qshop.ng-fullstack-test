const { Router } = require('express')
const router = Router()

const { onlyRole } = require('../../utils/security')
const jwtVerify = require('../../utils/jwtVerify')

// USE: verify every user in every routes
router.use('*', jwtVerify, onlyRole(['user']))

router.use('/:id', require('./product')) // View a product
router.use('/add', require('./add-product')) // Add a product
router.use('/all', require('./products')) // View all products
router.use('/update', require('./update-product')) // Update a product
router.use('/delete', require('./delete-product')) // Delete a product

module.exports = router
