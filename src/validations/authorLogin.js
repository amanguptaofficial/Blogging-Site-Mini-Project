const Joi = require("joi");
const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const author = require("../models/author");
const responseMessage = require("../utils/response-message");

//--------------------------------------------🔥Login Schema validation🔥----------------------------------------------
const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .lowercase(),
  password: Joi.string().trim().required(),
});



//-------------------------------------------🔥Login Schema Validation middleware🔥-----------------------------------------------------
const loginValidation = async function (req, res, next) {
  try {
    const data = loginSchema.validate(req.body);
    if (data.error) {
      res.send(
        Util.response({
          code: responseCode.BAD_REQUEST,
          msg: data.error.message,
          data: {},
        })
      );
    } else {
      req.body = data.value;
      next();
    }
  } catch (error) {
    console.log("error occured", error.message);
    res.send(
      Util.response({
        code: responseCode.INTERNAL_SERVER_ERROR,
        msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
        data: {},
      })
    );
  }
};


module.exports = { loginValidation };
