const jwt = require("jsonwebtoken");
const {
  create200Response,
  create400Response,
  create500Response,
  create401Response,
} = require("../utils/responseFuns");
const $prisma = require("../lib/$prisma");
const { refreshTokenRole } = require("../utils/constants");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");
const { exclude } = require("../utils/functions");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string") {
    return create400Response(res, "email must be string.");
  }
  if (typeof password !== "string") {
    return create400Response(res, "password must be string.");
  }

  try {
    const loggedInUser = await $prisma.user.findFirst({
      where: { email, password, active: true },
    });
    if (loggedInUser) {
      const loggedInUserWithoutPassword = exclude(loggedInUser, [
        "password",
        "active",
      ]);
      const accessToken = generateAccessToken(loggedInUserWithoutPassword.id);

      const refreshToken = generateRefreshToken(loggedInUserWithoutPassword.id);

      const response = {
        ...loggedInUserWithoutPassword,
        accessToken,
        refreshToken,
      };

      return create200Response(res, response);
    } else {
      return create401Response(res, "Wrong email or password is provided.");
    }
  } catch (error) {
    console.log(error.message);
    return create500Response(res, error);
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  const key = process.env.app_jwt_secret;

  if (!refreshToken)
    return create400Response(res, "Refresh token must be provided.");

  jwt.verify(refreshToken, key, (err, decoded) => {
    if (err) {
      return create401Response(res, err.message);
    }
    if (decoded.role !== refreshTokenRole) {
      return create400Response(res, "Please provide refresh token only.");
    }
    const accessToken = generateAccessToken(decoded.userId);
    return create200Response(res, { accessToken });
  });
};
