const multer = require('multer');
const { randomStr } = require('./randomStr');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const rename = () => {
      const nameArr = file.originalname.split('.');
      const ext = nameArr[nameArr.length - 1];
      return `${randomStr(12)}.${ext}`;
    };
    cb(null, rename());
  },
});

module.exports = multer({ storage });
