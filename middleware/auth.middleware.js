const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/jwt.service");
const { error } = require("../utils/response.handler");

module.exports = {
  authenticateAccessToken: async function (req, res, next) {
    try {
      let tokenFromReq =
        req.body.token || req.query.token || req.headers["x-access-token"];
      if (req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
          return res
            .status(400)
            .json(error("Access Denied token required", 400));
        tokenFromReq = authHeader.split(" ")[1];
      }

      if (tokenFromReq == null)
        return res.status(404).json(error("Token not found", 404));
      const payload = await verifyAccessToken(tokenFromReq);
      if (!payload)
        return res
          .status(400)
          .json(error("Invalid Token, Access denied!", 401));
      req.user = payload;
      next(req);
    } catch (err) {
      next(error);
    }
  },

  authenticateRefreshToken: async function (req, res, next) {
    try {
      let tokenFromReq =
        req.body.token || req.query.token || req.headers["x-access-token"];
      if (req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
          return res
            .status(400)
            .json(error("Access Denied token required", 400));
        tokenFromReq = authHeader.split(" ")[1];
      }

      if (tokenFromReq == null)
        return res.status(404).json(error("Token not found", 404));
      const payload = await verifyRefreshToken(tokenFromReq);
      if(!payload)  return res.status(400).json(error("Invalid Token, Access denied!", 401));
      req.user = payload;
      next(req);
    } catch (err) {
        next(error);
    }
  },
};
