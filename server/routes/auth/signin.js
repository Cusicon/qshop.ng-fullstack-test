const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// --( FILE VARIABLES )--
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET

// --( MODELS )--
const User = require('../../models/user')

router.post(
  '/',
  // email must be an email
  body('email', 'Please, enter a valid email!').notEmpty().isEmail(),
  // password must be at least 5 chars long
  body('password', 'Please, enter a password!').notEmpty().isString(),
  async (req, res) => {
    let original_password = req.body.password
    req.stringifyBody(req.body)
    req.body.password = original_password

    const errors = validationResult(req)
    const { email, password } = req.body

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

    try {
      const user = await User.findOne({ email }, [
        '_id',
        'email',
        'password',
      ]).lean()

      if (!user)
        return res.json({
          ...global.jsonBag,
          error: {
            message: 'Sorry, Invalid credentials!',
            data: null,
          },
          data: null,
        })

      if (await bcrypt.compare(password, user.password)) {
        // Create and sign token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_ACCESS_TOKEN_SECRET
        )

        // the email and password combination is successful and token is...
        // returned as data to the client to save
        return res.json({
          ...global.jsonBag,
          message: 'Yay, user successfully logged in!',
          error: null,
          data: { token },
        })
      }

      return res.json({
        ...global.jsonBag,
        error: {
          message: 'Sorry, Invalid credentials!',
          data: null,
        },
        data: null,
      })
    } catch (err) {
      return res.json({
        ...global.jsonBag,
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
