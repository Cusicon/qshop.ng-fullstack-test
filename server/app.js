require('word-casing')
require('dotenv').config()
require('./utils/dbconnect')()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const jsonBag = require('./utils/jsonBag')
const { genID } = require('./utils/extra')

// --( ROUTERS )--
const appRouter = require('./routes')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// --( CUSTOM MIDDLEWARES )--
app.use(jsonBag, (req, res, next) => {
  req.genID = (len) => genID(len)
  req.cleanBody = (body) =>
    Object.keys(req.body).forEach((rB) => {
      if (!body.includes(rB)) delete req.body[rB]
    })

  req.stringifyBody = (body) => {
    if (typeof body != 'undefined' && typeof body != null)
      req.body = JSON.parse(JSON.stringify(req.body).toLowerCase())
  }

  next()
})

app.use('/api', appRouter)

// --( ERROR HANDLERS )--
if (process.env.NODE_ENV !== 'development') {
  // catch 404 and forward to error handler
  app.use((req, res, next) => next(createError(404)))

  // error handler
  app.use((err, req, res, next) => {
    return res.json({
      ...global.jsonBag,
      status: (res.statusCode = err.status || 404),
      error: {
        message: err.message,
        data: { ...err },
      },
      data: null,
    })
  })
}

module.exports = app
