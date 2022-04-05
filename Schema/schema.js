const mongoose = require("mongoose");
const recordSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  last_updated: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("gfg", recordSchema);
