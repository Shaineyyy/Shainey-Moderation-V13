const { Schema, model } = require('mongoose')

const schema = new Schema({
   guildID: { type: String, default: "" },
   userID: { type: String, default: "" },
   Man: { type: Number, default: 0 },
   Woman: { type: Number, default: 0 },
   Total: { type: Number, default: 0 },
   Entries: { type: Array, default: [] },
});

module.exports = model("register", schema);