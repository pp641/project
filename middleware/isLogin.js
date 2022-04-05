const jwt = require("jsonwebtoken");
exports.isLogin = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  console.log("auth" ,authHeader);
  if (authHeader) {
    const token = authHeader.replace("Bearer", "");
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log("this is ", user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
