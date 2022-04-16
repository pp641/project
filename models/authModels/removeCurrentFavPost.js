const mongoose = require("mongoose");
const UserSchema = require("../../Schema/account");

const removeCurrentFavouritePost = async (req, res) => {
  console.log(req.body);
  const { email, id } = req.body;
  UserSchema.updateOne(
    { email: email },
    {
      $pull: {
        hasDone: id,
      },
    }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { removeCurrentFavouritePost };
