const { Router } = require('express')
const router = Router()

const { onlyRole } = require('../../utils/security')
const jwtVerify = require('../../utils/jwtVerify')

// USE: verify every user in every routes
router.use('*', jwtVerify, onlyRole(['user']))

router.use('/', require('./all-category')) // View all categories
router.use('/add', require('./add-category')) // Add a category
// router.use('/update', require('./update-category')) // Update a category
// router.use('/delete', require('./delete-category')) // Delete a category

module.exports = router
