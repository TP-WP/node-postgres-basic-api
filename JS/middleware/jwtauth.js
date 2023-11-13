require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWTAuth = (req,res, next)=>{
    const source = req.useragent;
    let token;
    if( source.isDesktop){
        token = req.cookies.token;
    }else{
        token = req.query.token;
    }
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    } catch (e) {
        if(source.isDesktop && !source.isNative){
            res.clearCookie("token");
        }
        res.send("invalid token");
    }
}

module.exports = { JWTAuth };