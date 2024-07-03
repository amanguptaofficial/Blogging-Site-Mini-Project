const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const authorService = require("../services/authorServices");

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

module.exports = { createAuthor };
