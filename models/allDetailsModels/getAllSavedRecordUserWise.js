const mongoose = require("mongoose");
const RecordSchema = require("../../Schema/schema");
const UserSchema = require("../../Schema/account");
const getAllSavedRecordUserWise = async (req, res) => {
  const email = req.body;
  console.log(email);
  let currentRecords = [];
  await UserSchema.find({ email: req.body.email })
    .then(async (response) => {
      let objectarray = response[0].hasDone;

      for (let details of objectarray) {
        await RecordSchema.findById({ _id: details }).then((response2) => {
          currentRecords.push(response2);
        });
      }
      res.json(currentRecords);
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

module.exports = { getAllSavedRecordUserWise };
