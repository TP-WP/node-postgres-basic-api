require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWTAuth = (req, res, next)=>{
    let platform;
    if(req.method=="GET"){
        platform = req.query.platform;
    }else if(req.method == "POST"){
        platform = req.body.platform;
    }
    let token;
    console.log("cookies: ", req.cookies);
    console.log("plataforma: ", platform)
    if(platform=="web"){
        token = req.cookies.token;
    }else{
        token = req.query.token;
    }
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    } catch (e) {
        if(platform=="web"){
            res.clearCookie("token");
        }
        res.send("invalid token");
    }
}

module.exports = { JWTAuth };