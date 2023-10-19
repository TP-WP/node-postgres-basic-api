const express = require("express");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const usuarios = require("../servicios/usuarios");

//POST login
router.post("/", async function (req, res, next) {
  const { email, contrasena } = req.query;
  const usuario = await usuarios.getSingle(email);
  console.log(usuario, contrasena);

  if (contrasena !== usuario.contrasena) {
    res.status(403).json("invalid login");
  } else {
    //token part
    const token = jwt.sign({ email }, process.env.MY_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send("login correcto");
  }
});

module.exports = router;
