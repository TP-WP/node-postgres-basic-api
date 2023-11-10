const express = require("express");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const usuarios = require("../servicios/usuarios");

//POST login
router.post("/", async function (req, res, next) {
  try{
    const { email, contrasena } = req.query;
    source = req.useragent;
    const response = await usuarios.validate_user(email, contrasena);
    if(response){
      const token = jwt.sign({email}, process.env.MY_SECRET, {
        expiresIn: 60*60,
      });
      if (source.isDesktop && !source.isNative) {
        //if desktop, send token in httponly cookie
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

module.exports = router;
