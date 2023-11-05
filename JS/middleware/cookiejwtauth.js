const jwt = require("jsonwebtoken");
require("dotenv").config();

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.clearCookie("token");
    res.send("invalid token");
  }
};

module.exports = { cookieJwtAuth };
