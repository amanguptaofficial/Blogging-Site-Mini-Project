const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const authorService = require("../services/authorServices");


//------------------------------------------------🔥Creating Author Controller🔥--------------------------------------------



const createAuthor = async function (req, res) {
  try {
   const isCreated = await authorService.createAuthorService(req.body);
    res.send(isCreated);
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


//----------------------------------------------------Author Login Controller🔥--------------------------------------------


const authorLogin = async function (req, res) {
  try {
    const loggedin = await authorService.authorLoginService(req.body);
    res.send(loggedin)
  } catch (error) {
    res.send(Util.response({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
      data: {},
    }))
  }
}



module.exports = { createAuthor, authorLogin };
