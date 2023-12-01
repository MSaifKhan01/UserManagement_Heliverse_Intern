const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,
  },
  {
    versionKey: false,
  }
);

let userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
