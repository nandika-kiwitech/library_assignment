const Joi = require("joi")


const users = Joi.object({
    name: Joi.string().min(3).max(10),
    gender: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
    //password: Joi.string().min(8),
    confirmPassword: Joi.ref('password'),
    phoneNum: Joi.number().min(10).max(10),
    isAdmin: Joi.string()
})
   // .with('password', 'confirmPassword');

const address = Joi.object({
hNum: Joi.number().min(1).max(3),
area: Joi.string().min(3),
city: Joi.string().min(3).max(11),
pinCode:Joi.number().min(6).max(6)
})

const books = Joi.object({
    title:Joi.string().min(3),
    author:Joi.string().min(3),
    category:Joi.string().min(3)
})
    module.exports ={users, address, books}