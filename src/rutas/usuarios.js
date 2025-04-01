const {Router} = require("express");
const jwt = require("jsonwebtoken");
const usuarios = require("../servicios/usuarios");
const { JWTAuth } = require("../middleware/jwtauth");
const { validateUserRegistration, userValidation } = require("../middleware/validation");
const {  uploadFile } = require("../middleware/upload_img");

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

//create new user
router.post("/", validateUserRegistration, userValidation, async function (req, res, next) {
  try {
    const {email, password} = req.body;
    const result = await usuarios.creaUsuario(email, password);
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
//post image
router.post("/upload-image", JWTAuth, uploadFile, async function (req,res,next){
  try{
    const { email } = req.user;
    const path = req.file.path
    const result = await usuarios.upload_image(email, path);
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
    const { email, password, platform } = req.body;
    const response = await usuarios.validate_user(email, password);
    if(response){
      const token = jwt.sign({email}, process.env.MY_SECRET, {
        //TODO this expire time should be thinked over a little
        //expiresIn: 60*60,
      });
      if (platform=="web") {
        //if app is running from a browser, send token as a cookie
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

router.get("/all", async (req,res)=>{
  try{
    const result = await usuarios.get_all_users();
    res.send(result);
  }catch(e){
    res.status(500).send(e);
    next(e);
  }
  return res
})

router.get("/validate", JWTAuth, async (req,res)=>{
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send(true);
})

module.exports = router;
