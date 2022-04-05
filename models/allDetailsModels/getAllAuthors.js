const mongoose = require("mongoose");
const RecordSchema = require("../../Schema/schema");

const getAllAuthors = (req, res) => {
  RecordSchema.distinct("author_id")
    .then((records) => {
      res.json(records);
    })
    .catch((err) => {
      res.json({ message: "Error", type: err });
    });
};

module.exports = {
  getAllAuthors,
};
