const jwt = require("jsonwebtoken");
const { create401Response } = require("../utils/responseFuns");
const { refreshTokenRole } = require("../utils/constants");

exports.validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  const key = process.env.app_jwt_secret;
  if (!token) return create401Response(res, "Please provide access token.");

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return create401Response(res, err.message);
    }
    if (decoded.role === refreshTokenRole) {
      return create401Response(
        res,
        "You can't use refresh token to authenticate."
      );
    }
    req.loggedInUser = decoded;
    next();
  });
};
