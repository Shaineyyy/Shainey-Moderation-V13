const { Schema, model } = require('mongoose');

const invite = new Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    Regular: { type: Number, default: 0 },
    Fake: { type: Number, default: 0 },
    Left: { type: Number, default: 0 },
    Bonus: { type: Number, default: 0 },
    leftedMembers: { type: Array, default: [] }
});

module.exports = model('invite', invite)