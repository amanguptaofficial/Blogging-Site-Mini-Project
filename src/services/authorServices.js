const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const author = require("../models/author");
const Bcrypt =require("bcrypt");

const createAuthorService = async function (authorData) {
  try {
    const findedAuthor =  await author.findOne({email:authorData.email});
    if(findedAuthor) return Util.responseFormat({code:responseCode.EMAIL_IS_ALREADY_EXITS,msg:responseMessage[responseCode.EMAIL_IS_ALREADY_EXITS],data:{}});
    const {password}= authorData;
    const hashPassword = Bcrypt.hashSync(password,5);
    authorData.password=hashPassword;
   const createdAuthor = await author.create(authorData);
    return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:createdAuthor});
  } catch (error) {
    return Util.responseFormat({ code: responseCode.INTERNAL_SERVER_ERROR, msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR], data: {},
    });
  }
};

module.exports = { createAuthorService };
