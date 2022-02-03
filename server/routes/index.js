const { Router } = require('express')
const router = Router()

// --( REQUIRES )--
const signInRouter = require('./auth/signin')
const signUpRouter = require('./auth/signup')
const uploadRouter = require('./upload')
const productsRouter = require('./products')
const categoryRouter = require('./category')

// --( AUTH ROUTERS )--
router.use('/signup', signUpRouter)
router.use('/signin', signInRouter)

// --( PRODUCTS ROUTERS )--
router.use('/products', productsRouter)
router.use('/category', categoryRouter)

// --( MEDIAS ROUTERS )--
router.use('/upload', uploadRouter)

module.exports = router
