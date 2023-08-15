const {
  create400Response,
  create500Response,
  create201Response,
  create200Response
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");
const { userRole } = require("../utils/constants");

exports.getAllUser = async (req, res) => {
  return create200Response(res, []);
};

exports.createUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (typeof phno !== "string") {
    return create400Response(res, "phno must be string.");
  }
  if (typeof password !== "string") {
    return create400Response(res, "password must be string.");
  }
  if (typeof name !== "string") {
    return create400Response(res, "name must be string.");
  }

  try {
    const users = await $prisma.user.findMany({
      where: {
        phno: phno,
      },
    });

    if (Array.isArray(users) && users.length > 0) {
      return create400Response(res, "phno is already taken.");
    } else {
      const createdUser = await $prisma.user.create({
        data: {
          name: name,
          phno: phno,
          password: password,
          role: userRole,
        },
        select: {
          id: true,
          name: true,
          phno: true,
        },
      });
      return create201Response(res, createdUser);
    }
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  return create200Response(res, []);
};
