const jwt = require("jsonwebtoken");
const { userRole, refreshTokenRole } = require("./constants");

exports.generateAccessToken = (userId) => {
  const key = process.env.app_jwt_secret;
  const expireHour = process.env.app_accesstoken_expiration_hr;

  const accessToken = jwt.sign({ userId, role: userRole }, key, {
    expiresIn: expireHour,
  });

  return accessToken;
};

exports.generateRefreshToken = (userId) => {
  const key = process.env.app_jwt_secret;
  const expireDay = process.env.app_refreshtoken_expiration_day;

  const refreshToken = jwt.sign({ userId, role: refreshTokenRole }, key, {
    expiresIn: expireDay,
  });

  return refreshToken;
};
