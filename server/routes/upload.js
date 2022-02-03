const { Router } = require('express')
const path = require('path')
const multerUpload = require('../utils/multerconnect')
const { onlyRole } = require('../utils/security')
const jwtVerify = require('../utils/jwtVerify')
const router = Router()

// POST: upload a file either "pdf", "video" or "image"
router.post(
  '/media',
  jwtVerify,
  onlyRole(['any']),
  multerUpload.single('file_url'),
  async (req, res) => {
    try {
      const { where } = req.query
      let res_message = ''

      switch (where) {
        case 'video':
          res_message = 'Congrats, video has been uploaded successfully!'
          break

        case 'pdf':
          res_message = 'Congrats, pdf has been uploaded successfully!'
          break

        case 'image':
          res_message = 'Congrats, image has been uploaded successfully!'
          break

        default:
          res_message = 'Congrats, uploaded successfully!'
          break
      }

      // If there is no "where" in the url
      if (!where)
        return res.json({
          ...global.jsonBag,
          error: { message: 'Sorry, please set a destination!', data: null },
          data: null,
        })

      // If there is no file
      if (!req.file)
        return res.json({
          ...global.jsonBag,
          error: { message: "Sorry, You haven't sent a file!", data: null },
          data: null,
        })

      const filePath =
        process.env.NODE_ENV !== 'development'
          ? `https://media.${req.hostname}/storage${
              req.file.path.split('storage')[1]
            }`
          : `${path.join(__dirname, `../${req.file.path}`)}`

      req.file.path = filePath

      // Else continue...
      return res.json({
        ...global.jsonBag,
        message: res_message,
        error: null,
        data: { ...req.file },
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
