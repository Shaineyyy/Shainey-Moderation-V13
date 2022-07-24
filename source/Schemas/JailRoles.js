const { Schema, model } = require('mongoose');

const schema = new Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    Roles: { type: Array, default: [] }
});

module.exports = model("jailroles", schema);