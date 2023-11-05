const express = require("express");
const router = express.Router();
const usuarios = require("../servicios/usuarios");

//POST usuario
router.post("/", async function (req, res, next) {
  try {
    result = await usuarios.creaUsuario(req.query);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

module.exports = router;
