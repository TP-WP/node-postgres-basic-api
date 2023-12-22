const multer = require("multer");
const {v2: cloudinary} = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require("dotenv").config();

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV"
  }
});

const fileFilter = (req, file, cb)=>{
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype){
      return cb(null, true);
  }
  cb("archivo no valido");
}

function uploadFile(req, res, next) {
  const upload = multer({
    storage: cloudinaryStorage,
    fileFilter
  }).single('profile');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log('err: ', err)
    } else if (err) {
        // An unknown error occurred when uploading.
        console.log('err: ', err)
    }
    // Everything went fine. 
    next()
  })
}

module.exports = { uploadFile };