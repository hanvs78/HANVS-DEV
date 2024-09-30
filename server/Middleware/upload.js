const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        const unipueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // original file
        cb(null, file.originalname)
        // if need to change file name to add the { 'Han-' }
        // cb(null, 'Han-' + file.originalname)

    }
})

exports.upload = multer({ storage: storage }).single('file')