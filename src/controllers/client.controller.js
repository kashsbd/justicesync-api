const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllClient = async (req, res) => {
  return create200Response(res, []);
};

exports.createClient = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteClient = async (req, res) => {
  return create200Response(res, {});
};
