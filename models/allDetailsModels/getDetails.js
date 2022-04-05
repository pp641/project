const mongoose = require("mongoose");
const getData = (req, res) => {
  console.log(req.body);
  return res.json(req.user);
};

module.exports = { getData };
