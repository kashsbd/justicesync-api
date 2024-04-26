const {
  create200Response,
  create400Response,
  create500Response,
  create201Response
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
        case: {
          select: {
            id: true,
            caseName: true,
          },
        },
        staff: {
          select: {
            id: true,
            salutation: true,
            firstName: true,
            lastName: true,
          },
        },
        createdDate: true,
        activityCode: true,
        clockedHours: true,
        clockedMinutes: true,
        billedHours: true,
        billedMinutes: true,
        servicePerformedDescription: true,
      },
    });
    return create200Response(res, timeEntries);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.createTimeEntry = async (req, res) => {
  const body = ({
    caseId,
    staffId,
    createdDate,
    activityCode,
    clockedHours,
    clockedMinutes,
    billedHours,
    billedMinutes,
    servicePerformedDescription,
  } = req.body);

  if (!caseId) {
    return create400Response(res, "please provice caseId.");
  }

  if (!staffId) {
    return create400Response(res, "please provice staffId.");
  }

  if (!createdDate) {
    return create400Response(res, "please provice createdDate.");
  }

  if (!activityCode) {
    return create400Response(res, "please provice activityCode.");
  }

  if (!clockedHours) {
    return create400Response(res, "please provice clockedHours.");
  }

  if (!clockedMinutes) {
    return create400Response(res, "please provice clockedMinutes.");
  }

  if (!billedHours) {
    return create400Response(res, "please provice billedHours.");
  }

  if (!billedMinutes) {
    return create400Response(res, "please provice billedMinutes.");
  }

  if (!servicePerformedDescription) {
    return create400Response(
      res,
      "please provice servicePerformedDescription."
    );
  }

  try {
    const createdTimeEntry = await $prisma.timeEntry.create({
      data: {
        ...body,
      },
    });

    return create201Response(res, createdTimeEntry);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.deleteTimeEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedTimeEntry = await $prisma.timeEntry.findUnique({
      where: {
        id: id,
      },
    });

    if (!selectedTimeEntry) {
      return create400Response(
        res,
        "time entry does not exists with given Id."
      );
    }

    const updatedTimeEntry = await $prisma.timeEntry.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });

    return create200Response(res, updatedTimeEntry);
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};
