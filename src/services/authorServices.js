const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const author = require("../models/author");
const Bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------------------------🔥Create Author Service🔥-------------------------------------------

const createAuthorService = async function (authorData) {
  try {
    const findedAuthor =  await author.findOne({email:authorData.email});
    if(findedAuthor) return Util.responseFormat({code:responseCode.EMAIL_IS_ALREADY_EXITS,msg:responseMessage[responseCode.EMAIL_IS_ALREADY_EXITS],data:{}});
    const {password} = authorData;
    const hashPassword = Bcrypt.hashSync(password,5);
    authorData.password = hashPassword;
   const createdAuthor = await author.create(authorData);
    return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:createdAuthor});
  } catch (error) {
    return Util.responseFormat({ code: responseCode.INTERNAL_SERVER_ERROR, msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR], data: {},
    });
  }
};

// ------------------------------------------------🔥Author Login Service🔥-------------------------------------------

const authorLoginService = async function(loginData){
 try {
   const {email,password}= loginData;
   const foundData = await author.findOne({email});
   if (!foundData)
    return Util.response({
        code: responseCode.EMAIL_DOES_NOT_EXITS,
        msg: responseMessage[responseCode.EMAIL_DOES_NOT_EXITS],
        data: {},
      })
  const isvalid = Bcrypt.compareSync(password , foundData.password);
  if(isvalid){
    const token = jwt.sign({id:foundData._id},"my-application");
    return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:token})
  }else{
     return Util.responseFormat({code:responseCode.AUTHENTICATION_FAILED,msg:responseMessage[responseCode.AUTHENTICATION_FAILED],data:{}});
  }
 } catch (error) {
  return Util.responseFormat({ code: responseCode.INTERNAL_SERVER_ERROR, msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR], data: {},})
 }
}



module.exports = { createAuthorService, authorLoginService};
