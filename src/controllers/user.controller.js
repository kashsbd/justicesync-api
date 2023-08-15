const {
  create400Response,
  create500Response,
  create201Response,
  create200Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");
const { exclude } = require("../utils/functions");

exports.getAllUser = async (req, res) => {
  try {
    const users = await $prisma.user.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        email: true,
        salutation: true,
        firstName: true,
        lastName: true,
        initials: true,
        roleType: true,
        globalHourlyRate: true,
        phno: true,
      },
    });
    return create200Response(res, users);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.createUser = async (req, res) => {
  const body = ({
    email,
    password,
    salutation,
    firstName,
    lastName,
    initials,
    roleType,
    globalHourlyRate,
    phno,
  } = req.body);

  if (!email) {
    return create400Response(res, "please provide email");
  }
  if (!password) {
    return create400Response(res, "please provide password");
  }
  if (!salutation) {
    return create400Response(res, "please provide salutation");
  }
  if (!firstName) {
    return create400Response(res, "please provide firstName");
  }
  if (!lastName) {
    return create400Response(res, "please provide lastName");
  }
  if (!initials) {
    return create400Response(res, "please provide initials");
  }
  if (!roleType) {
    return create400Response(res, "please provide roleType");
  }
  if (!globalHourlyRate) {
    return create400Response(res, "please provide globalHourlyRate");
  }
  if (!phno) {
    return create400Response(res, "please provide phno");
  }

  try {
    const users = await $prisma.user.findMany({
      where: {
        email: email,
      },
    });

    if (Array.isArray(users) && users.length > 0) {
      return create400Response(res, "email is already taken.");
    } else {
      const createdUser = await $prisma.user.create({
        data: {
          ...body,
        },
      });
      const userWithoutPassword = exclude(createdUser, ["password"]);
      return create201Response(res, userWithoutPassword);
    }
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedUser = await $prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!selectedUser) {
      return create400Response(res, "user does not exists with given Id.");
    }

    const updatedUser = await $prisma.user.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    const userWithoutPassword = exclude(createdUser, ["password"]);
    return create200Response(res, userWithoutPassword);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};
