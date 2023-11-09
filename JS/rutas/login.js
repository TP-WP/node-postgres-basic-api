const express = require("express");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const usuarios = require("../servicios/usuarios");

//POST login
router.post("/", async function (req, res, next) {
  try{
    const { email, contrasena } = req.query;
    const response = await usuarios.validate_user(email, contrasena);
  
    if (response) {
      //token part
      const token = jwt.sign({email}, process.env.MY_SECRET, {
        expiresIn: 60*60,
      });
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.send("login correcto");
    } else {
      res.status(403).json("invalid login");
    }
  }catch(error){
    res.status(500).send(error);
    next(error);
  }
  
});

module.exports = router;
