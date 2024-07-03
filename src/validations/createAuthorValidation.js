const Joi = require("joi");
const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");

const authorSchema = Joi.object({
  fname:Joi.string().regex(/^[A-Za-z]+$/).message("fname contains only the character").required(),
  lname: Joi.string().regex(/^[A-Za-z]+$/).message("lname contain only the character").required(),
  title: Joi.string().valid('Mr','Mrs','Miss').required(),
  email: Joi.string().email({minDomainSegments: 2,tlds:{allow:['com','net']}}).required(),
  password: Joi.string().required(),
});

function validateAuthor(req, res, next) {
  const result = authorSchema.validate(req.body);
  if (!result.error) {
    next();
  } else {
     res.send(
      Util.response({
        code: responseCode.BAD_REQUEST,
        msg: result.error.message,
        data: {},
      })
    );
  }
}

module.exports = { validateAuthor };
