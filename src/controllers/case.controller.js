const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");

exports.getAllCase = async (req, res) => {
  try {
    const cases = await $prisma.case.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        courtCaseNumber: true,
        caseName: true,
        isCaseBillable: true,
        caseDescription: true,
        client: {
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
          },
        },
        responsibleLawyer: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        originatingLawyer: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        secretaryInCharge: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        isCaseOpen: true,
        caseOpenDate: true,
      },
    });
    return create200Response(res, cases);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.createCase = async (req, res) => {
  return create200Response(res, {});
};

exports.deleteCase = async (req, res) => {
  return create200Response(res, {});
};
