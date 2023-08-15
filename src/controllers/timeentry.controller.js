const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllTimeEntry = async (req, res) => {
  try {
    const timeEntries = await $prisma.timeEntry.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
      },
    });
    return create200Response(res, timeEntries);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.createTimeEntry = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteTimeEntry = async (req, res) => {
  const { id } = req.params;
  return create200Response(res, {});
};
