const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb)=>{
  console.log("filefilter: ")
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(file.originalname.split(".").filter(Boolean).slice(-1));
  if(mimetype && extname){
      return cb(null, true);
  }
  cb("archivo no valido");
}

function uploadFile(req, res, next) {
  const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
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

const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter
}).single('profile');

module.exports = { uploadFile };