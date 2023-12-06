const multer = require("multer");
const { v4: uuidv4} = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname,"../../uploads"), 
  filename: (req, file, cb)=>{
    cb(null, uuidv4() + file.originalname.split(".").filter(Boolean).slice(-1));
}
});

const upload = multer({
  storage,
  limits: {fileSize: 1000000},
  fileFilter: (req, file, cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(file.originalname.split(".").filter(Boolean).slice(-1));
    if(mimetype && extname){
        return cb(null, true);
    }
    cb("archivo no valido");
  }
}).single("image");

const storage2 = new multer.memoryStorage();
const upload2 = multer({
  storage2,
  limits: {fileSize: 1000000},
  fileFilter: (req, file, cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(file.originalname.split(".").filter(Boolean).slice(-1));
    if(mimetype && extname){
        return cb(null, true);
    }
    cb("archivo no valido");
  }
});


module.exports = { upload, upload2 };