require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWTAuth = (req,res, next)=>{
    source = req.useragent;
    let token
    if( req.isDesktop){
        token = req.cookies.token;
    }else{
        token = req.query.token;
    }
    try {
        console.log(token);
        const user = jwt.verify(token, process.env.MY_SECRET);
        console.log(user);
        req.user = user;
        next();
    } catch (e) {
        if(req.isDesktop){
            res.clearCookie("token");
        }
        res.send("invalid token");
    }
}

module.exports = { JWTAuth };