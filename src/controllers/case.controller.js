const {
  create200Response,
  create400Response,
  create500Response,
  create201Response,
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
  const body = ({
    courtCaseNumber,
    caseName,
    isCaseBillable = true,
    caseDescription = "",
    clientId,
    responsibleLawyerId,
    originatingLawyerId,
    secretaryInChargeId,
    isCaseOpen = true,
    caseOpenDate,
  } = req.body);

  if (!caseName) {
    return create400Response(res, "please provice caseName.");
  }

  if (!clientId) {
    return create400Response(res, "please provice clientId.");
  }

  if (!responsibleLawyerId) {
    return create400Response(res, "please provice responsibleLawyerId.");
  }

  if (!originatingLawyerId) {
    return create400Response(res, "please provice originatingLawyerId.");
  }

  if (!secretaryInChargeId) {
    return create400Response(res, "please provice secretaryInChargeId.");
  }

  if (!caseOpenDate) {
    return create400Response(res, "please provice caseOpenDate.");
  }

  try {
    const createdCase = await $prisma.case.create({
      data: {
        ...body,
      },
    });

    return create201Response(res, createdCase);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.deleteCase = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedCase = await $prisma.case.findUnique({
      where: {
        id,
      },
    });

    if (!selectedCase) {
      return create400Response(res, "case does not exists with given Id.");
    }

    const updatedCase = await $prisma.case.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });

    return create200Response(res, updatedCase);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};
