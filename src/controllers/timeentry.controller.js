const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllTimeEntry = async (req, res) => {
    return create200Response(res, []);
  };

exports.createTimeEntry = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteTimeEntry = async (req, res) => {
  return create200Response(res, {});
};
