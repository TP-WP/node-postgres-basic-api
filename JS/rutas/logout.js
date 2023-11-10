const express = require("express");
const router = express.Router();
const { JWTAuth } = require("../middleware/jwtauth");

router.get("/", JWTAuth, (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out " });
});

  module.exports = router;
