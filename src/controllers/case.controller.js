const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllCase = async (req, res) => {
  return create200Response(res, []);
};

exports.createCase = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteCase = async (req, res) => {
  return create200Response(res, {});
};
