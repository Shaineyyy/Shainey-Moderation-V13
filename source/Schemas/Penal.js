const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  penal: { type: Array, default: [] },
  top: { type: Number, default: 0 },
});

module.exports = model("ceza", schema);