const express = require("express");
const router = express.Router();
const usuarios = require("../servicios/usuarios");

//get user data
router.get("/", async function (req, res, next) {
  try {
    const {email} = req.query
    result = await usuarios.get_user(email);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

router.post("/", async function (req, res, next) {
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

module.exports = router;
