require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWTAuth = (req, res, next)=>{
   let token;
    if(req.cookies.token){
        token = req.cookies.token;
    }else if(req.headers.authorization){
        token = req.headers.authorization;
    }
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    } catch (e) {
        res.clearCookie("token")
        res.send("invalid token");
    }
}

module.exports = { JWTAuth };