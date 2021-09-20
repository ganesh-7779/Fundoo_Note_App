const Joi = require('joi');
  
const validateSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).pattern(new RegExp('^[A-Z]+[a-z]{2,}')).required(),
    lastName: Joi.string().min(2).max(100).pattern(new RegExp('^[A-Z]+[a-z]{2,}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$")).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
}); 

module.exports = validateSchema;

const loginSchema = Joi.object({
    email: Joi.string().email().pattern(new RegExp("^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$")).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
})

module.exports = loginSchema;
