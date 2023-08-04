const { conforms } = require("lodash");
const multer = require("multer");
const path  = require('path');
const AppError = require("../utils/appError");
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath =  path.join(__dirname, process.env.FILE_PATH);
      console.log("====destinationPath=====",destinationPath);
      fs.access(destinationPath, (error) => {
        if (error) {
          // Directory doesn't exist, create it
          fs.mkdir(destinationPath, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
              cb(err, null);
            } else {
              cb(null, destinationPath);
            }
          });
        } else {
          // Directory exists, use it
          cb(null, destinationPath);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
    },
  });  

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        console.log("calledv1")
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new AppError('Only .png, .jpg and .jpeg format allowed!',400)
            err.name = 'ExtensionError'
            console.log("ABC", err);
            return cb(err);
        }
    },
}).array('uploadedImages')

function uploadFiles(folder) {
  const dir = './media/images/' + folder;

  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
  }
  const Storages = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, dir);
      },


      filename: (req, file, cb) => {
          const fileNameCheck = file.originalname.replace(
              /[-&\/\\#.,+()$~%'":*?<>{} ]/g,
              '',
          );
          cb(null, `${Date.now()}${path.extname(file.originalname)}`, +'.png');

      },
  });

  return multer({ storage: Storages });
}


module.exports = {multi_upload,uploadFiles}