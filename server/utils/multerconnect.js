const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')

const UPLOAD_REFERENCE = '../media/storage'
const FILE_MAX_SIZE = 10485760 // 10 MB in bytes

// --( MULTER CONFIGURATION )--
const fileStorage = multer.diskStorage({
  // multer configuration to enable us set the path and naming convention for our newly uploaded files
  destination: (req, file, cb) => {
    const { where } = req.query

    switch (where) {
      case 'video':
        dest = `${UPLOAD_REFERENCE}/videos`
        break

      case 'image':
        dest = `${UPLOAD_REFERENCE}/images`
        break

      default:
        dest = `${UPLOAD_REFERENCE}/trash`
        break
    }

    fs.mkdir(dest, { recursive: true }, (err, dir) => {
      if (err) throw err
      cb(null, dest)
    })
  },
  filename: (req, file, cb) => {
    let filename = `${file.fieldname}_${uuid.v4()}${path.extname(
      file.originalname
    )}`
    cb(null, filename)
  },
})

const fileExtensionFilter = {
  videos: (file) =>
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/mkv' ||
    file.mimetype === 'video/mov',
  images: (file) =>
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif',
}

const fileFilter = (req, file, cb) => {
  const { where } = req.query

  // if uploading an video
  if (where === 'video') {
    if (fileExtensionFilter.videos(file)) cb(null, true)
    else cb(null, false) // else fails
  }

  // else if uploading an image
  else if (where === 'image') {
    if (fileExtensionFilter.images(file)) cb(null, true)
    else cb(null, false) // else fails
  }

  // else fail completely
  else cb(null, false)
}

const multerError = (err, _req, res, next) => {
  if (err)
    return res.json({
      ...global.jsonBag,
      status: (res.statusCode = 413),
      error: {
        message: err.message,
        data: { ...err },
      },
      data: null,
    })
  next()
}

const multerUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: FILE_MAX_SIZE },
})

module.exports = { multerError, multerUpload }
