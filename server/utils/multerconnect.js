const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')

// --( MULTER CONFIGURATION )--
const fileStorage = multer.diskStorage({
  // multer configuration to enable us set the path and naming convention for our newly uploaded files
  destination: (req, file, cb) => {
    const { where } = req.query

    switch (where) {
      case 'video':
        dest = '../media.employed-dot-ng.carryna.com/storage/videos'
        break

      case 'pdf':
        dest = '../media.employed-dot-ng.carryna.com/storage/pdfs'
        break

      case 'image':
        dest = '../media.employed-dot-ng.carryna.com/storage/images'
        break

      default:
        dest = '../media.employed-dot-ng.carryna.com/storage/trash'
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
  pdfs: (file) =>
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  images: (file) =>
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif',
}

const fileFilter = (req, file, cb) => {
  const { where } = req.query

  if (where === 'video') {
    // else if uploading an video
    // check file type to be mp4
    if (fileExtensionFilter.videos(file)) cb(null, true)
    else cb(null, false) // else fails
  } else if (where === 'pdf') {
    // else if uploading an ebook
    // check file type to be pdf, doc, or docx
    if (fileExtensionFilter.pdfs(file)) cb(null, true)
    else cb(null, false) // else fails
  } else if (where === 'image') {
    // else if uploading an video
    // check file type to be mp4
    if (fileExtensionFilter.images(file)) cb(null, true)
    else cb(null, false) // else fails
  } else cb(null, false)
}

module.exports = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
})
