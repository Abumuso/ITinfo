const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
      }
      // console.log(authorization);
      const bearer = authorization.split("")[0];
      const token = authorization.split("")[1];

      if (bearer != "Bearer" || !token) {
        return res
          .status(403)
          .json({ message: "Avtor ro'yxatdan o'tmagan(token berilmagan)" });
      }
      const { is_export, authorRoles } = jwt.verify(
        token,
        config.get("secret")
      );
      let hasRole = false;
      authorRoles.forEach((authorRoles) => {
        if (roles.includes(authorRoles)) hasRole = true;
      });

      if (!is_export || !hasRole) {
        return res
          .status(403)
          .json({ message: "Sizga bunday huquq berilmagan" });
      }
      
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .send({ message: "Avtor ro'yxatdan o'tmagan(token berilmagan)" });
    }
  };
};
