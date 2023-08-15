const {
  create200Response,
  create400Response,
  create500Response,
  create201Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");
const { validClientTypes } = require("../utils/constants");
const { exclude } = require("../utils/functions");

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
  const {
    type,
    companyName,
    businessRegistrationNumber,
    idCardNumber,
    dateOfBirth,
    salutation,
    firstName,
    lastName,
    fax,
    email,
    phno,
    createdById,
    referredById,
    createDate,
    note,
    isSameAsBillingAddress,
    postalAddress,
  } = req.body;

  if (typeof type !== "string") {
    return create400Response(res, "type must be string.");
  }

  if (!validClientTypes.includes(type.trim().toLowerCase())) {
    return create400Response(res, "please provide valid client type.");
  }

  if ("company" === type.trim().toLowerCase()) {
    if (typeof companyName !== "string") {
      return create400Response(res, "companyName must be string.");
    }
  } else if ("person" === type.trim().toLowerCase()) {
    if (typeof idCardNumber !== "string") {
      return create400Response(res, "idCardNumber must be string.");
    }

    if (!dateOfBirth) {
      return create400Response(res, "please provide date of birth.");
    }
  }

  if (typeof salutation !== "string") {
    return create400Response(res, "salutation must be string.");
  }

  if (typeof firstName !== "string") {
    return create400Response(res, "firstName must be string.");
  }

  if (typeof lastName !== "string") {
    return create400Response(res, "lastName must be string.");
  }

  if (typeof email !== "string") {
    return create400Response(res, "email must be string.");
  }

  if (typeof phno !== "string") {
    return create400Response(res, "phno must be string.");
  }

  if (!createdById) {
    return create400Response(res, "please provide createdById");
  }

  if (!referredById) {
    return create400Response(res, "please provide referredById");
  }

  if (!createDate) {
    return create400Response(res, "please provide client created date.");
  }

  if (!postalAddress?.addressOne) {
    return create400Response(res, "please provide addressOne.");
  }

  if (!postalAddress?.addressTwo) {
    return create400Response(res, "please provide addressTwo.");
  }

  if (!postalAddress?.city) {
    return create400Response(res, "please provide city.");
  }

  if (!postalAddress?.state) {
    return create400Response(res, "please provide state.");
  }

  if (!postalAddress?.postalCode) {
    return create400Response(res, "please provide postalCode.");
  }

  if (!postalAddress?.country) {
    return create400Response(res, "please provide country.");
  }

  const bodyWithoutPostalAddress = exclude(req.body, ["postalAddress"]);

  try {
    const createdAddress = await $prisma.address.create({
      data: {
        ...postalAddress,
      },
    });

    const createdClient = await $prisma.client.create({
      data: {
        ...bodyWithoutPostalAddress,
        postalAddressId: createdAddress.id,
        billdingAddressId: isSameAsBillingAddress ? createdAddress.id : null,
      },
    });

    return create201Response(res, createdClient);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedClient = await $prisma.client.findUnique({
      where: {
        id: id,
      },
    });

    if (!selectedClient) {
      return create400Response(res, "client does not exists with given Id.");
    }

    const updatedClient = await $prisma.client.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });

    return create200Response(res, updatedClient);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};
