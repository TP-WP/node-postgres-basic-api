const {Router} = require("express");
const jwt = require("jsonwebtoken");
const autores = require("../services/autores");
const { JWTAuth } = require("../middleware/jwtauth");

const router = Router();
require("dotenv").config();

router.post("/login", async function (req, res, next) {
  try{
    const { email, contrasena } = req.body;
    const response = await autores.valida_usuario(email, contrasena);
    if(response){
      const token = jwt.sign({email}, process.env.MY_SECRET);
      res.cookie("token", token, {httpOnly: true})
      .status(200)
      .json({ result: true });
    } else {
      res.status(401).json("inicio de sesion invalido");
    }
  }catch(error){
    res.status(500).send(error);
    next(error);
  }
});

router.get("/logout", (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Sesion cerrada correctamente " });
});

router.get("/validate", JWTAuth, async (req,res)=>{
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send(true);
})

module.exports = router;