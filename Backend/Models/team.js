
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  members: [
    {
      data: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

const teamModel = mongoose.model("team", teamSchema);

module.exports = { teamModel };
