const Joi = require("joi");
const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");

// ------------------------------------------------🔥Create Author Schema Validation🔥-------------------------------------------
const authorSchema = Joi.object().keys({
  fname: Joi.string().regex(/^[A-Za-z]+$/).message("fname contains only the character").required().trim().lowercase(),
  lname: Joi.string().regex(/^[A-Za-z]+$/).message("lname contain only the character").required().trim().lowercase(),
  title: Joi.string().valid('Mr', 'Mrs', 'Miss').required().trim(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase(),
  password: Joi.string().required().trim(),
});


//----------------------------------------------🔥 Create Author middleware🔥----------------------------------------------
function validateAuthor(req, res, next) {
  const result = authorSchema.validate(req.body);
  if (!result.error) {
    req.body = result.value;
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
