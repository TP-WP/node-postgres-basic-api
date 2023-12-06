//validation goes here
const { check, validationResult } = require("express-validator");

const validateUserRegistration = [
    check('email').normalizeEmail().isEmail().withMessage('invalid email'),
    check('contrasena').trim().not().isEmpty().withMessage("password is empty").isLength({min: 8, max: 20}).
    withMessage("password must be 8 to 20 characters long")
]

const userValidation = (req,res,next)=>{
    const result = validationResult(req.body).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success: false, message: error});
}

module.exports = { validateUserRegistration, userValidation }