const {Router} = require("express");
const jwt = require("jsonwebtoken");
const usuarios = require("../servicios/usuarios");
const {resizeFile} = require("../servicios/img-resize");
const { JWTAuth } = require("../middleware/jwtauth");
const { validateUserRegistration, userValidation } = require("../middleware/validation");
const { upload } = require("../middleware/upload_img");

const router = Router();
require("dotenv").config();

//get user data
router.get("/",JWTAuth, async function (req, res, next) {
  try {
    const {email} = req.query
    result = await usuarios.get_user(email);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

router.post("/", validateUserRegistration, userValidation, async function (req, res, next) {
  try {
    const {email, contrasena} = req.query
    result = await usuarios.creaUsuario(email, contrasena);
    res.send(result);
  } catch (error) {
    if(error.code == 23505){
      res.status(500).send( "email ya registrado");
    }else{
      res.status(500).send(error)
    }
    next(error);
  }
});

router.post("/upload-image", JWTAuth, upload, async function (req,res,next){
  try{
    //havent been tested!!
    const result = await usuarios.store_image_path(req.file.path);
    resizeFile(req.file.path);
    if(result){
      res.json("image saved succesfully");
    }
  }catch(error){
    res.status(500).send(error);
    next(error);
  }
});

//POST login
router.post("/login", async function (req, res, next) {
  try{
    const { email, contrasena } = req.query;
    source = req.useragent;
    const response = await usuarios.validate_user(email, contrasena);
    if(response){
      const token = jwt.sign({email}, process.env.MY_SECRET, {
        //TODO this expire time should be thinked over a little
        expiresIn: 60*60,
      });
      if (source.isDesktop) {
        //TODO ackshually this sould check any kind of browser that supports http only cookies
        res.cookie("token", token, {
          httpOnly: true,
          })
          .status(200)
          .json({ message: "Logged in successfully" });
      } else{
        //in any other case, send token as response
        res.send(token);
      }
    }
    else {
      res.status(403).json("invalid login");
    }
  }catch(error){
    res.status(500).send(error);
    next(error);
  }
});

router.get("/logout", JWTAuth, (req, res) => {
  //TODO this is not working for all devices. only with cookies. it needs to insta expire token for mobile
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out " });
});

module.exports = router;
