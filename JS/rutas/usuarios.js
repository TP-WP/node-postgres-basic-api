const express = require("express");
const router = express.Router();
const usuarios = require("../servicios/usuarios");
const { cookieJwtAuth } = require("../middleware/cookiejwtauth");

//get user data
router.get("/", cookieJwtAuth, async function (req, res, next) {
  try {
    result = await usuarios.get_user(req.query);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
});

module.exports = router;
