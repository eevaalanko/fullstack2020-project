const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
  },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  active: { type: Boolean },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  entries: [
    { type: String}
  ]
});

module.exports = mongoose.model("OwnChallenge", schema);
