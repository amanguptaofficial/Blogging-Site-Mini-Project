const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const jwt = require("jsonwebtoken");

//-------------------------------------------------🔥Check Authentication middileware🔥---------------------------------

const checkAuthentication = async function (req, res, next) {
  try {
    const token = req.headers["x-api-key"];
    if (!token) {
      res.send(
        Util.response({
          code: responseCode.AUTHENTICATION_FAILED,
          msg: responseMessage[responseCode.AUTHENTICATION_FAILED],
          data: {},
        })
      );
    } else {
        jwt.verify(token, "my-application", (error, token) => {
        if (error)
          res.send(
            Util.response({
              code: responseCode.AUTHENTICATION_FAILED,
              msg: responseMessage[responseCode.AUTHENTICATION_FAILED],
              data: {},
            })
          );
        else {
          const tokenAuthorId = token.id;
          req.tokenAuthorId = tokenAuthorId;
          next();
        }
      });
    }
  } catch (error) {
    res.send(
      Util.response({
        code: responseCode.INTERNAL_SERVER_ERROR,
        msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
        data: {},
      })
    );
  }
};


module.exports = { checkAuthentication};
