const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllClient = async (req, res) => {
  try {
    const clients = await $prisma.client.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        type: true,
        companyName: true,
        businessRegistrationNumber: true,
        idCardNumber: true,
        dateOfBirth: true,
        salutation: true,
        firstName: true,
        lastName: true,
        fax: true,
        email: true,
        phno: true,
        createdBy: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        referredBy: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        createDate: true,
        postalAddress: true,
        isSameAsBillingAddress: true,
        buildingAddress: true,
      },
    });
    return create200Response(res, clients);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.createClient = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteClient = async (req, res) => {
  return create200Response(res, {});
};
