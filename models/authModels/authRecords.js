const mongoose = require("mongoose");
const UserSchema = require("../../Schema/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginIntoAccount = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  await UserSchema.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          user: user,
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              payload: payload,
            });
          }
        );
      } else {
        return res.json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

const createNewAccount = (req, res) => {
  console.log(req.body);

  UserSchema.findOne({ email: req.body.data.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      console.log("getting");
      const newUser = new UserSchema({
        name: req.body.data.name,
        email: req.body.data.email,
        password: req.body.data.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
        });
      });
    }
  });
};

const sendLikeStatus = (req, res) => {
  let [id, email, like] = req.body.data;
  console.log(id, email, like);
  if (like === "like") {
    UserSchema.updateOne(
      { email: email },
      {
        $push: {
          hasDone: id,
        },
      }
    )
      .then(async(user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } else if (like === "dislike") {
    UserSchema.updateOne(
      { email: email },
      {
        $pull: {
          hasDone: id,
        },
      }
    )
      .then((user) => {
        console.log(user);
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  }
};

const getCurrentUser = async (req, res) => {
  console.log("curent", req.body);
  await UserSchema.find({ email: req.body.email })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getCurrentUser,
  createNewAccount,
  sendLikeStatus,
  loginIntoAccount,
};
