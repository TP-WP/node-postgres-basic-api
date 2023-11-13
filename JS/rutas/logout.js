const express = require("express");
const router = express.Router();
const { JWTAuth } = require("../middleware/jwtauth");

//TODO on desktop clear cookie on other devices i must research

router.get("/", JWTAuth, (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out " });
});

  module.exports = router;
