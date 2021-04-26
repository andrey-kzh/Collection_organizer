const multer = require('multer');
const { randomStr } = require('./randomStr');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const rename = () => {
            const nameArr = file.originalname.split('.')
            const ext = nameArr[nameArr.length - 1]
            return `${randomStr(12)}.${ext}`
        }
        cb(null, rename())
    }
})

module.exports = multer({ storage: storage })
 