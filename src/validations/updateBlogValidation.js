const Util = require("../utils/Utils")
const Joi = require("joi");
const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const mongoose = require("mongoose");
const blog = require("../models/blog");



// ------------------------------------------🔥update Blog Schema🔥------------------------------------------------------- 
const updateSchema = Joi.object().keys({
        title:Joi.string().regex(/[a-zA-Z0-9?]+/).message("title contains only the character").trim().lowercase(),
        body:Joi.string().regex(/[a-zA-Z0-9]+/).message("body can contain only the character and number").trim().lowercase(),
        tags:Joi.array().items(Joi.string().regex(/[a-zA-Z ]+/).message("tags contains only the character").trim().lowercase()),
        subcategory:Joi.array().items(Joi.string().regex(/^[A-Za-z]+$/).message("subcategory contains only the character").trim().lowercase()),
        isPublished:Joi.boolean()
})



// ---------------------------------------🔥Update blog validation middleware🔥-------------------------------------------------------

const checkBlogIdExits = async function(req,res,next){
  try {
  const result = updateSchema.validate(req.body);
     if(result.error) res.send(Util.response({code:responseCode.BAD_REQUEST,msg:result.error.message,data:{}}));
     req.body =result.value;
      next(); 
  } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
  }
}

module.exports={
    checkBlogIdExits
}