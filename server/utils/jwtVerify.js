const jwt = require('jsonwebtoken')

// --( MODELS )--
const User = require('../models/user')

module.exports = async (req, res, next) => {
  const auth_header = req.headers.authorization
  const token = auth_header && auth_header.split(' ')[1]

  // If there is no token, return an error
  if (!token)
    return res.json({
      ...global.jsonBag,
      status: (res.statusCode = 401),
      message: 'Sorry, no token sent!',
      error: null,
      data: null,
    })

  // If token is found, get user.id from JWT and
  // find user"s proper info from DB
  try {
    let user_payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

    let found_user = await User.findById(user_payload.id, [
      '_id',
      'role',
      'name',
      'email',
      'avatar',
      'createdAt',
    ]).lean()

    // If there is no user, return an error
    if (!found_user)
      return res.json({
        ...global.jsonBag,
        error: {
          message: 'Sorry, no user found!',
          data: null,
        },
        data: null,
      })

    found_user.name = {
      first: `${found_user.name.split(' ')[0]}`,
      last: `${found_user.name.split(' ')[1]}`,
    }

    req.user = found_user
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
  next()
}
