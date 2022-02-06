const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

// --( MODELS )--
const User = require('../../models/user')

// POST: register a user
router.post(
  '/',
  // role must be a string
  body('role', 'Please, select a role!').notEmpty().isString(),
  // firstname must be a string
  body('name')
    .notEmpty()
    .isString()
    .custom((value) => {
      // If name is not 2 values
      // E.g Success Chukwu

      if (value.split(' ').length < 2)
        throw new Error('Please, enter your fullname!')

      return value
    }),
  // email must be an email
  body('email', 'Please, enter a valid email!').notEmpty().isEmail(),
  // password must be at least 5 chars long
  body('password', 'Please, password must be above 5 characters!').isLength({
    min: 5,
  }),
  async (req, res) => {
    let original_password = req.body.password
    req.stringifyBody(req.body)
    req.body.password = original_password

    const errors = validationResult(req)
    const { role, name, email, password } = req.body
    const secret_token = req.genID(6)

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

    // Create User
    try {
      let hashed_password = await bcrypt.hash(password, 10)
      let avatar = `https://ui-avatars.com/api/?name=${name
        .split(' ')
        .join(
          '%20'
        )}&background=fce5e7&color=e50000&size=128&rounded=true&bold=true`
      await User.create({
        role,
        name,
        email,
        avatar,
        password: hashed_password,
        secret_token,
      })

      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 201),
        message: 'Congrats, your account has been created successfully!',
        error: null,
        data: null,
      })
    } catch (err) {
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = err.status || 500),
        error: {
          message:
            err.code === 11000 ? 'Sorry, account already exist!' : err.message,
          data: { ...err },
        },
        data: null,
      })
    }
  }
)

module.exports = router
