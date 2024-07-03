const Joi = require("joi");
const Util = require("../utils/Utils");
const mongoose = require("mongoose");
const responseCode = require("../utils/response-code");
const author = require("../models/author");
const responseMessage = require("../utils/response-message");


const blogSchema= Joi.object({
  title:Joi.string().regex(/[a-zA-Z0-9?]+/).message("title contains only the character").required(),
  body:Joi.string().regex(/[a-zA-Z0-9]+/).message("body can contain only the character and number").required(),
  authorId:Joi.string().required().custom((value,helpers)=>{
     if(!mongoose.Types.ObjectId.isValid(value)){
      return helpers.message('Invalid authorId');
     }else{
      return value;
     }}),
  tags:Joi.array().items(Joi.string().regex(/[a-zA-Z ]+/).message("tags contains only the character")),
  category:Joi.string().regex(/^[A-Za-z]+$/).message("category contains only the character").required(),
  subcategory:Joi.array().items(Joi.string().regex(/^[A-Za-z]+$/).message("subcategory contains only the character")),
  isPublished:Joi.boolean().default(false)
})

async function validateBlog(req,res,next){
    const result = blogSchema.validate(req.body);
    if(!result.error){
       const id =result.value.authorId;
    const authorData = await author.findById(id);
    if(!authorData) res.send(Util.response({code:responseCode.AUTHOR_IS_NOT_PRESENT,msg:responseMessage[responseCode.AUTHOR_IS_NOT_PRESENT],data:{}}));
       next();  
    }else{
      res.send(Util.response({code:responseCode.BAD_REQUEST,msg:result.error.message,data:{}}));
    }

}


module.exports={validateBlog};