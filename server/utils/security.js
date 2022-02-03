const bcrypt = require('bcryptjs')
const User = require('../models/user')

// If user"s role is not equal to args fields
// return error, else continue
const onlyRole = (args) => (req, res, next) => {
  let real_args = args.toString().toLowerCase().split(',')
  let separated_args = args.toString().split('::')

  args = separated_args
  // If passed argument doesn't contain, "candidate", "employer" or "any", then do this
  if (!args.includes(req.user.role) && !args.includes('any'))
    return res.json({
      ...global.jsonBag,
      status: (res.statusCode = 403), // Forbidden
      error: {
        message: "Sorry, you're forbidden from accessing this route!",
        data: null,
      },
      data: null,
    })

  args = real_args
  // If passed argument contains, user's role, and "::account" as a suffix, the do this
  if (args.includes(`${req.user.role}::account`)) {
    if (typeof req.user.profile?._id == 'undefined')
      return res.json({
        ...global.jsonBag,
        status: (res.statusCode = 403), // Forbidden
        error: {
          message: `Sorry, you don't have ${
            req.user.role == 'employer' ? "an employer's" : "a candidate's"
          } account. Go create one!`,
          data: null,
        },
        data: null,
      })
  }

  next()
}

// Ask for password before proceeding
const authUserByPassword = async (req, res, next) => {
  const { auth_password } = req.body

  try {
    const logged_in_user = await User.findById(req.user._id, [
      'password',
    ]).lean()
    if (await bcrypt.compare(auth_password, logged_in_user.password))
      return next()

    return res.json({
      ...global.jsonBag,
      error: {
        message: "Sorry, you've entered a wrong password!",
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

module.exports = { onlyRole, authUserByPassword }
